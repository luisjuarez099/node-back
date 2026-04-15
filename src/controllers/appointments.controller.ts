
import { Request, Response } from "express";
import { getAppointmentServiceById } from "../services/appointments.service";

export const getUserAppointments = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    try {
        if (isNaN(userId)) return res.status(400).json({ message: "ID de usuario no válido" });

        const appointments = await getAppointmentServiceById(userId);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las citas del usuario", error });
    }

};