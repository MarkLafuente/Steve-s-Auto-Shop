import User from "../models/UserModel.js";

export async function getAllCourse(req, res) {
  try {
    const { department, isActive, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const courses = await Course.find(filter)
      .populate('instructor', 'firstName lastName email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Course.countDocuments(filter);

    res.json({
      data: courses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export async function createCourse(req, res) {
  try {
    const { courseCode, courseName, department, credits, description, instructor, capacity } = req.body;

    if (!courseCode || !courseName || !department || !credits || !capacity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course code already exists' });
    }

    // Verify instructor exists if provided
    if (instructor) {
      const instructorExists = await User.findById(instructor);
      if (!instructorExists || instructorExists.role !== 'teacher') {
        return res.status(400).json({ message: 'Invalid instructor' });
      }
    }

    const course = new Course({
      courseCode,
      courseName,
      department,
      credits,
      description,
      instructor,
      capacity,
    });

    await course.save();

    res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export async function updateCourse(req, res) {
  try {
    const { courseName, department, credits, description, instructor, capacity, isActive } = req.body;
    const updateData = {};

    if (courseName) updateData.courseName = courseName;
    if (department) updateData.department = department;
    if (credits) updateData.credits = credits;
    if (description) updateData.description = description;
    if (capacity) updateData.capacity = capacity;
    if (isActive !== undefined) updateData.isActive = isActive;

    if (instructor) {
      const instructorExists = await User.findById(instructor);
      if (!instructorExists || instructorExists.role !== 'teacher') {
        return res.status(400).json({ message: 'Invalid instructor' });
      }
      updateData.instructor = instructor;
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('instructor', 'firstName lastName email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course updated successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export async function deleteCourse(req, res) {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}