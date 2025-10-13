import express from "express";
import multer from 'multer';
import csv from 'csv-parser';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';
import Course from '../models/Course.js';
import User from '../models/UserModel.js';
import StudentPerformance from '../models/StudentPerformance.js';
import Enrollment from '../models/Enrollment.js';
import { calculateRiskLevel, predictStudentGrade } from '../utils/predictiveAnalytics.js';
import { Readable } from 'stream';
import { getCsvTemplate, uploadGradesFromCsv, getClassPerformance, getAtRiskStudents } from "../controllers/TeacherController.js"

const upload = multer({ storage: multer.memoryStorage() });
const teacherOnly = [authMiddleware, roleMiddleware('teacher')];

const router = express.Router();

router.get("/csv-template/:courseId", teacherOnly, getCsvTemplate);
router.get("/upload-grades/:courseId", teacherOnly, upload.single('file'), uploadGradesFromCsv);
router.get("/csv-template/:courseId", teacherOnly, getClassPerformance);
router.get("/csv-template/:courseId", teacherOnly, getAtRiskStudents);

export default router;