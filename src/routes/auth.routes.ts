import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
/**
 * Aqui no usamos auth porque estas rutas son publicas, no requieren autenticacion para acceder a ellas
 */