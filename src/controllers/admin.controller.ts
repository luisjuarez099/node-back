import { Request, Response } from "express";
import { createTimeBlocksService, listReservationsService } from "../services/admin.service";



export const adminPanel = async (req: Request, res: Response) => {
    console.log("Accediendo al panel de administración");
};

export const createTimeBlocks = async (req: Request, res: Response) => {
    //solo admin puede ejecutar esta funcion para crear bloques de tiempo para reservas
    if (req.user.role !== 'ADMIN') return res.status(403).json({ message: "Acceso denegado" });

    const { startTime, endTime } = req.body;
    try {
        const newTimeBlock = await createTimeBlocksService({ startTime, endTime });
        res.status(201).json(newTimeBlock);
    } catch (error) {

        res.status(500).json({ message: "Error al crear el bloque de tiempo", error });
    }

};

export const listReservations = async (req: Request, res: Response) => {
    //solo admin puede ejecutar esta funcion para listar reservas realizadas
    if (req.user.role !== 'ADMIN') return res.status(403).json({ message: "Acceso denegado" });

    try {

        const reservations = await listReservationsService();
        res.json(reservations);

    } catch (error) {
        res.status(500).json({ message: "Error al listar las reservas", error });
    }

};