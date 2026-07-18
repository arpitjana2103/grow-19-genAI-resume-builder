import { Router } from "express";

import { generateInterviewReportController } from "../controllers/interview.controller.js";
import { uploadPDF } from "../middlewares/multer.middleware.js";

const interviewRoute = Router();

interviewRoute.route("/").post(uploadPDF.single("resume"), generateInterviewReportController);

export default interviewRoute;
