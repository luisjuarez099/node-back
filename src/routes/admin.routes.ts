import { Router } from "express";
import { adminPanel, createTimeBlocks, listReservations } from "../controllers/admin.controller";
import { authToken } from "../middlewares/auth";
const router = Router();

// Aquí puedes definir las rutas específicas para el panel de administración

router.get('/', adminPanel);
router.post('/time-blocks', authToken, createTimeBlocks); //crear bloques de tiempo para reservas
router.get('/reservations', authToken, listReservations);//listar reservas realizadas
export default router;