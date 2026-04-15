import { Router } from "express";
import { authToken } from "../middlewares/auth";
import { getUserAppointments } from "../controllers/appointments.controller";
const router = Router();

// Aquí puedes definir las rutas relacionadas con los appoiments
// Por ejemplo:
router.get('/:id/appointments', authToken, getUserAppointments);

export default router;