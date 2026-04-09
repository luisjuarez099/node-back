import { Request, Response } from "express";
import { AllUsers } from "../services/showUsers.service";

export const showUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await AllUsers();
        res.json(allUsers);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};