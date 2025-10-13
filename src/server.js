import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import teacherRoutes from "./routes/teacherRoutes.js"

import { connectDB } from "./config/dbconnection.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(
    cors({
        origin: [
            "http://localhost:5173"
        ],
    }
    ));

app.use(express.json()); // this middleware will parse JSON bodies: req.body

//routes
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/teacher", teacherRoutes)

//connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
});