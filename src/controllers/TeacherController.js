import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import User from '../models/UserModel.js';
import StudentPerformance from '../models/StudentPerformance.js';
import { calculateRiskLevel, predictStudentGrade } from '../utils/predictiveAnalytics.js';
import { Readable } from 'stream';

export async function getCsvTemplate(req, res) {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('instructor');

        if (!course || course.instructor._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Get enrolled students
        const enrollments = await Enrollment.find({ course: courseId, status: 'active' })
            .populate('student', 'firstName lastName email');

        // Create CSV content
        const headers = ['Student Email', 'First Name', 'Last Name', 'Grade (0-100)', 'Attendance (%)', 'Assessment 1', 'Assessment 2', 'Assessment 3'];
        const rows = [headers];

        enrollments.forEach((enrollment) => {
            const { student } = enrollment;
            rows.push([
                student.email,
                student.firstName,
                student.lastName,
                '',
                '',
                '',
                '',
                '',
            ]);
        });

        const csvContent = rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', `attachment; filename="grades_template_${course.courseCode}.csv"`);
        res.send(csvContent);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function uploadGradesFromCsv(req, res) {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('instructor');

        if (!course || course.instructor._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const results = { success: 0, failed: 0, errors: [], updated: [] };
        const records = [];

        await new Promise((resolve, reject) => {
            Readable.from([req.file.buffer])
                .pipe(csv())
                .on('data', (data) => {
                    records.push(data);
                })
                .on('error', reject)
                .on('end', resolve);
        });

        for (const record of records) {
            try {
                // Find student by email
                const student = await User.findOne({ email: record['Student Email']?.toLowerCase().trim() });

                if (!student) {
                    results.failed++;
                    results.errors.push({
                        email: record['Student Email'],
                        error: 'Student not found',
                    });
                    continue;
                }

                // Find or create performance record
                let performance = await StudentPerformance.findOne({
                    student: student._id,
                    course: courseId,
                });

                if (!performance) {
                    performance = new StudentPerformance({
                        student: student._id,
                        course: courseId,
                    });
                }

                // Update grades
                const grade = parseInt(record['Grade (0-100)']) || performance.grades || 0;
                const attendance = parseInt(record['Attendance (%)']) || performance.attendance || 0;

                // Process assessments
                const assessments = [];
                for (let i = 1; i <= 5; i++) {
                    const key = `Assessment ${i}`;
                    if (record[key] && record[key].trim()) {
                        assessments.push({
                            name: `Assessment ${i}`,
                            score: parseInt(record[key]),
                            date: new Date(),
                        });
                    }
                }

                if (assessments.length > 0) {
                    performance.assessments = assessments;
                }

                performance.grades = grade;
                performance.attendance = attendance;

                // Calculate GPA (simple scale: grade / 10 * 4)
                performance.gpa = parseFloat((grade / 25).toFixed(2));

                // Determine status
                performance.status = grade >= 60 ? 'pass' : 'fail';

                // Calculate risk level
                const assessmentAvg =
                    assessments.length > 0
                        ? assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length
                        : grade;

                const { riskLevel, riskScore } = calculateRiskLevel(grade, attendance, assessmentAvg);
                performance.riskLevel = riskLevel;
                performance.riskScore = riskScore;

                // Predict grade
                performance.predictedGrade = predictStudentGrade(grade, attendance, assessmentAvg);

                await performance.save();

                results.success++;
                results.updated.push({
                    email: student.email,
                    name: `${student.firstName} ${student.lastName}`,
                    grade,
                    attendance,
                    status: performance.status,
                    riskLevel,
                });
            } catch (err) {
                results.failed++;
                results.errors.push({
                    email: record['Student Email'],
                    error: err.message,
                });
            }
        }

        res.json({
            message: 'Grades uploaded successfully',
            results,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function updateStudentGrade(req, res) {
    try {
        const { performanceId } = req.params;
        const { grades, attendance, assessments } = req.body;

        const performance = await StudentPerformance.findById(performanceId)
            .populate('course');

        if (!performance) {
            return res.status(404).json({ message: 'Performance record not found' });
        }

        // Verify authorization
        const course = await Course.findById(performance.course._id);
        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        if (grades !== undefined) {
            performance.grades = grades;
            performance.status = grades >= 60 ? 'pass' : 'fail';
            performance.gpa = parseFloat((grades / 25).toFixed(2));
        }

        if (attendance !== undefined) {
            performance.attendance = attendance;
        }

        if (assessments && Array.isArray(assessments)) {
            performance.assessments = assessments;
        }

        // Recalculate risk and prediction
        const assessmentAvg =
            performance.assessments.length > 0
                ? performance.assessments.reduce((sum, a) => sum + a.score, 0) / performance.assessments.length
                : performance.grades || 0;

        const { riskLevel, riskScore } = calculateRiskLevel(
            performance.grades || 0,
            performance.attendance || 0,
            assessmentAvg
        );
        performance.riskLevel = riskLevel;
        performance.riskScore = riskScore;
        performance.predictedGrade = predictStudentGrade(
            performance.grades || 0,
            performance.attendance || 0,
            assessmentAvg
        );

        await performance.save();

        res.json({
            message: 'Grade updated successfully',
            performance,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function getClassPerformance(req, res) {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const performances = await StudentPerformance.find({ course: courseId })
            .populate('student', 'firstName lastName email');

        if (performances.length === 0) {
            return res.json({
                courseName: course.courseName,
                totalStudents: 0,
                averageGrade: 0,
                averageAttendance: 0,
                passingRate: 0,
                performances: [],
            });
        }

        const averageGrade =
            performances.reduce((sum, p) => sum + (p.grades || 0), 0) / performances.length;
        const averageAttendance =
            performances.reduce((sum, p) => sum + (p.attendance || 0), 0) / performances.length;
        const passingCount = performances.filter((p) => p.status === 'pass').length;

        res.json({
            courseName: course.courseName,
            totalStudents: performances.length,
            averageGrade: averageGrade.toFixed(2),
            averageAttendance: averageAttendance.toFixed(2),
            passingRate: ((passingCount / performances.length) * 100).toFixed(2),
            performances: performances.sort((a, b) => (a.grades || 0) - (b.grades || 0)),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function getAtRiskStudents(req, res) {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const atRiskStudents = await StudentPerformance.find({
      course: courseId,
      riskLevel: { $in: ['medium', 'high'] },
    })
      .populate('student', 'firstName lastName email')
      .sort({ riskScore: -1 });

    res.json({
      totalAtRisk: atRiskStudents.length,
      students: atRiskStudents,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}