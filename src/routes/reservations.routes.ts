import { Router } from "express";
import { authToken } from "../middlewares/auth";
//constroler
import { createReservation, getReservation, updateReservation, deleteReservation } from "../controllers/reservation.controller";
const router = Router();

// Aquí puedes definir las rutas específicas para las reservas
router.get('/:id', authToken, getReservation);
router.post('/', authToken, createReservation)
router.put('/:id', authToken, updateReservation);
router.delete('/:id', authToken, deleteReservation);
export default router; 