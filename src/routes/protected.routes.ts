import { Router } from "express";
import { authToken } from "../middlewares/auth";
import { protectedRoute } from "../controllers/protected.controller";

const router = Router();

router.get("/protected-route", authToken, protectedRoute);

export default router;

/**
 * Usamos auth en esta ruta porque es una ruta protegida, solo los usuarios autenticados pueden acceder a ella
 */