import { Router } from "express";
import { authToken } from "../middlewares/auth";

import { showUsers } from "../controllers/showUsers.controller";
const router = Router();

router.get("/users", authToken, showUsers);

export default router;