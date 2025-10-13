import express from "express";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/UserController.js";
import { getAllCourse, createCourse, updateCourse, deleteCourse } from "../controllers/CourseController.js";
import { getOverAllAnalytics, getPerformanceStatisticsbyCourse, getPassingRate, getAtRiskStudents } from "../controllers/DashboardController.js";

// Middleware to ensure admin access
const adminOnly = [authMiddleware, roleMiddleware('admin')];

const router = express.Router();

//handle users
router.get("/users", ...adminOnly, getAllUsers);
router.get("/users/:id", ...adminOnly, getUser);
router.post("/users", ...adminOnly, createUser);
router.put("/users/:id", ...adminOnly, updateUser);
router.delete("/users/:id", ...adminOnly, deleteUser);

//handle courses
router.get("/courses", ...adminOnly, getAllCourse);
router.post("/courses", ...adminOnly, createCourse);
router.put("/courses/:id", ...adminOnly, updateCourse);
router.delete("/courses/:id", ...adminOnly, deleteCourse);

//analytics and dashboard
router.get("/analytics/overview", ...adminOnly, getOverAllAnalytics);
router.get("/analytics/performance/:courseId", ...adminOnly, getPerformanceStatisticsbyCourse);
router.get('/analytics/grades-distribution', ...adminOnly, getPassingRate);
router.get('/analytics/at-risk-students', ...adminOnly, getAtRiskStudents);

export default router;
