"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../utils/AppError");
const errorHandler = (err, req, res, next) => {
    console.error('Error Trace:', err);
    let error = err;
    if (error.name === 'ZodError') {
        const message = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        error = new AppError_1.AppError(`Validation Error: ${message}`, 400);
    }
    if (!(error instanceof AppError_1.AppError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        error = new AppError_1.AppError(message, statusCode);
    }
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stack: error.stack,
    });
};
exports.errorHandler = errorHandler;
