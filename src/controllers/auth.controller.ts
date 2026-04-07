import { Request, Response } from "express";
import { prisma } from "../configuration/prisma.config";
import bcrypt from "bcrypt";
import * as jose from "jose";

export const register = async (req: Request, res: Response) => {

    try {

        const { name, email, passwd } = req.body;

        const hashedPassword = await bcrypt.hash(passwd, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwd: hashedPassword,
                role: "USER"
            }
        });

        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};


export const login = async (req: Request, res: Response) => {

    try {

        const { email, passwd } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        const validPassword = await bcrypt.compare(passwd, user.passwd);

        if (!validPassword) {
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        const secret = new TextEncoder().encode(process.env.JWT_TOKEN);

        const token = await new jose.SignJWT({
            sub: user.id.toString(),
            role: user.role
        })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("2h")
            .sign(secret);

        res.json({ token });

    } catch (error) {

        res.status(500).json({ error: "Error en login" });

    }

};