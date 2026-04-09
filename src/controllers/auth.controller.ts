import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {

    try {

        const user = await registerUser(req.body);

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({ error: "Error al registrar usuario" });

    }

};

export const login = async (req: Request, res: Response) => {

    try {

        const token = await loginUser(req.body);

        res.json({ token });

    } catch (error) {

        res.status(400).json({ error: "Credenciales inválidas" });

    }

};