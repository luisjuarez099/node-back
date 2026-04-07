import { jwtVerify } from "jose";
import { Request, Response, NextFunction } from "express";

const secret = new TextEncoder().encode(process.env.JWT_TOKEN);

export async function authToken(req: Request, res: Response, next: NextFunction) {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Token requerido" });
        }

        const token = authHeader.replace("Bearer ", "");

        const { payload } = await jwtVerify(token, secret);

        req.user = payload;

        next();

    } catch (error) {

        return res.status(401).json({ error: "Token inválido" });

    }

}