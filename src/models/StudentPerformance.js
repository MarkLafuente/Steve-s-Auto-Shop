import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    grades: { type: Number, min: 0, max: 100 },
    attendance: { type: Number, min: 0, max: 100, default: 0 },
    assessments: [
      {
        name: String,
        score: { type: Number, min: 0, max: 100 },
        date: { type: Date, default: Date.now },
      },
    ],
    gpa: { type: Number, default: 0 },
    status: { type: String, enum: ['pass', 'fail', 'pending'], default: 'pending' },
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Performance = mongoose.model("StudentPerformance", performanceSchema);

export default Performance;