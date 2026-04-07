import { Request, Response } from "express";
import { prisma } from "../configuration/prisma.config";


export const showUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};