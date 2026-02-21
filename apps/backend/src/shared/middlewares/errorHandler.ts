import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error Trace:', err);

    let error = err as any;

    if (error.name === 'ZodError') {
        const message = error.errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ');
        error = new AppError(`Validation Error: ${message}`, 400);
    }

    if (!(error instanceof AppError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        error = new AppError(message, statusCode);
    }

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stack: error.stack,
    });
};
