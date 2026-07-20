import { Router } from "express";

import {
    deleteInterviewReportByIdController,
    generateInterviewReportController,
    generateResumePdfController,
    getAllInterviewReportsByUserId,
    getInterviewReportByIdController,
} from "../controllers/interview.controller.js";
import { uploadPDF } from "../middlewares/multer.middleware.js";

const interviewRoute = Router();

interviewRoute
    .route("/")
    .post(uploadPDF.single("resume"), generateInterviewReportController)
    .get(getAllInterviewReportsByUserId);

interviewRoute
    .route("/:interviewReportId")
    .get(getInterviewReportByIdController)
    .delete(deleteInterviewReportByIdController);
interviewRoute.route("/:interviewReportId/resume").get(generateResumePdfController);

export default interviewRoute;
