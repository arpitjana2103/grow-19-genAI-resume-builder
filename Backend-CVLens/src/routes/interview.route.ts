import { Router } from "express";

import {
    generateInterviewReportController,
    getAllInterviewReportsByUserId,
    getInterviewReportByIdController,
} from "../controllers/interview.controller.js";
import { uploadPDF } from "../middlewares/multer.middleware.js";
import { getAllInterviewReportsOfAUserService } from "../services/interview.service.js";

const interviewRoute = Router();

interviewRoute
    .route("/")
    .post(uploadPDF.single("resume"), generateInterviewReportController)
    .get(getAllInterviewReportsByUserId);

interviewRoute.route("/:id").get(getInterviewReportByIdController);

export default interviewRoute;
