import { type Request } from "express";
import multer, { type FileFilterCallback } from "multer";

import { HTTPSTATUSCODE } from "../configs/http.config.js";
import { ErrorCodeEnum } from "../enums/error-code.enum.js";
import { AppError } from "../utils/errors/app-error.util.js";

const documntFilter = function (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    const extension = file.originalname.toLowerCase().split(".").pop();

    if (file.mimetype !== "application/pdf" || extension !== "pdf") {
        return cb(
            new AppError({
                statusCode: HTTPSTATUSCODE.BAD_REQUEST,
                publicMessage: "Only PDF files are allowed",
                errorCode: ErrorCodeEnum.BAD_REQUEST,
            }),
        );
    }

    cb(null, true);
};

export const uploadPDF = multer({
    fileFilter: documntFilter,
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024, // 3MB
    },
});
