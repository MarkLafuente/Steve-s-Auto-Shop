

export async function getOverAllAnalytics() {
    try {
        const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
        const totalTeachers = await User.countDocuments({ role: 'teacher', isActive: true });
        const totalCourses = await Course.countDocuments({ isActive: true });
        const totalAdmins = await User.countDocuments({ role: 'admin', isActive: true });

        res.json({
            totalStudents,
            totalTeachers,
            totalCourses,
            totalAdmins,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function getPerformanceStatisticsbyCourse() {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const performances = await StudentPerformance.find({ course: courseId });

        if (performances.length === 0) {
            return res.json({
                courseName: course.courseName,
                totalStudents: 0,
                passingRate: 0,
                failingRate: 0,
                averageGrade: 0,
                averageAttendance: 0,
                riskDistribution: { low: 0, medium: 0, high: 0 },
            });
        }

        const passingStudents = performances.filter((p) => p.status === 'pass').length;
        const failingStudents = performances.filter((p) => p.status === 'fail').length;
        const averageGrade =
            performances.reduce((sum, p) => sum + (p.grades || 0), 0) / performances.length;
        const averageAttendance =
            performances.reduce((sum, p) => sum + (p.attendance || 0), 0) / performances.length;

        const riskDistribution = {
            low: performances.filter((p) => p.riskLevel === 'low').length,
            medium: performances.filter((p) => p.riskLevel === 'medium').length,
            high: performances.filter((p) => p.riskLevel === 'high').length,
        };

        res.json({
            courseName: course.courseName,
            totalStudents: performances.length,
            passingRate: ((passingStudents / performances.length) * 100).toFixed(2),
            failingRate: ((failingStudents / performances.length) * 100).toFixed(2),
            averageGrade: averageGrade.toFixed(2),
            averageAttendance: averageAttendance.toFixed(2),
            riskDistribution,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function getPassingRate() {
    try {
        const performances = await StudentPerformance.find();

        const gradeRanges = {
            'A (90-100)': performances.filter((p) => p.grades >= 90).length,
            'B (80-89)': performances.filter((p) => p.grades >= 80 && p.grades < 90).length,
            'C (70-79)': performances.filter((p) => p.grades >= 70 && p.grades < 80).length,
            'D (60-69)': performances.filter((p) => p.grades >= 60 && p.grades < 70).length,
            'F (Below 60)': performances.filter((p) => p.grades < 60).length,
        };

        const total = performances.length;
        const distribution = {};
        for (const [grade, count] of Object.entries(gradeRanges)) {
            distribution[grade] = {
                count,
                percentage: total > 0 ? ((count / total) * 100).toFixed(2) : 0,
            };
        }

        res.json(distribution);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export async function getAtRiskStudents() {
    try {
        const { courseId, riskLevel = 'high' } = req.query;
        const filter = { riskLevel };

        if (courseId) filter.course = courseId;

        const atRiskStudents = await StudentPerformance.find(filter)
            .populate('student', 'firstName lastName email')
            .populate('course', 'courseName');

        res.json({
            totalAtRisk: atRiskStudents.length,
            students: atRiskStudents,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}