import { Request, Response } from "express";

export const ErrorHandle = (err: any, req: Request, res: Response, next: () => void) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error Interno del Servidor';

    console.error(`[${new Date().toISOString()}] Error: ${message}`);

    if (err.stack) console.error(err.stack);


    res.status(statusCode).json({ error: message, statusCode: statusCode, ...(err.stack ? { stack: err.stack } : {}) });
}