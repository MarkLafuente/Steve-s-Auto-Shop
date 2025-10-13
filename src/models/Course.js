import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseCode: { type: String, required: true, unique: true },
    courseName: { type: String, required: true },
    department: { type: String, required: true },
    credits: { type: Number, required: true },
    description: { type: String, default: '' },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    capacity: { type: Number, required: true },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// module.exports = mongoose.model('Course', courseSchema);

const Course = mongoose.model("Course", courseSchema);

export default Course;