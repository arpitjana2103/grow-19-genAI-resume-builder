import { Router } from "express";

import {
    generateInterviewReportController,
    getInterviewReportByIdController,
} from "../controllers/interview.controller.js";
import { uploadPDF } from "../middlewares/multer.middleware.js";

const interviewRoute = Router();

interviewRoute.route("/").post(uploadPDF.single("resume"), generateInterviewReportController);

interviewRoute.route("/:id").get(getInterviewReportByIdController);

export default interviewRoute;
