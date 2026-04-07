import { Request, Response } from "express";

export const protectedRoute = (req: Request, res: Response) => {
    res.json({
        message: "Acceso concedido",
        user: req.user
    });
};