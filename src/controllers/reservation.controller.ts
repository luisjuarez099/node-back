import { Request, Response } from "express";
import { createReservationService, getReservationService, updateReservationService, deleteReservationService } from "../services/reservation.service"

export const createReservation = async (req: Request, res: Response) => {
    try {
        const reservation = await createReservationService(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reserva" });
    }
};


export const getReservation = async (req: Request, res: Response) => {
    try {

        if (!req.params.id) return res.status(400).json({ message: "ID de reserva es requerido" });

        if (isNaN(Number(req.params.id))) return res.status(400).json({ message: "ID de reserva debe ser un número" });

        const id = Number(req.params.id);

        const reservation = await getReservationService(id);

        if (!reservation) return res.status(404).json({ message: "Reserva no encontrada" });

        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la reserva" });
    }
};

export const updateReservation = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(400).json({ message: "ID de reserva es requerido" });

        if (isNaN(Number(req.params.id))) return res.status(400).json({ message: "ID de reserva debe ser un número" });

        const id = Number(req.params.id);

        const reservation = await updateReservationService(id, req.body);

        if (!reservation) return res.status(404).json({ message: "Reserva no encontrada" });

        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reserva", statusbar: error });
    }
};

export const deleteReservation = async (req: Request, res: Response) => {


    try {
        if (!req.params.id) return res.status(400).json({ message: "ID de reserva es requerido" });

        if (isNaN(Number(req.params.id))) return res.status(400).json({ message: "ID de reserva debe ser un número" });

        const id = Number(req.params.id);

        const reservation = await deleteReservationService(id);

        if (!reservation) return res.status(404).json({ message: "Reserva no encontrada" });

        res.json({ message: "Reserva eliminada correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reserva" });
    }
}