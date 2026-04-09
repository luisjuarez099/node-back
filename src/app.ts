import express from "express";
import morgan from "morgan";

import { LoggerMiddleware } from "./middlewares/logger";
import { ErrorHandle } from "./middlewares/errorHandle";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import reservations from "./routes/reservations.routes"
import protectedRoutes from "./routes/protected.routes";
import showUsersRoutes from "./routes/showUsers.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(LoggerMiddleware);

// rutas - En app.ts defines el prefijo del módulo
app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/show", showUsersRoutes);

//admin
app.use("/api/admin", adminRoutes);
app.use("/api/reservations", reservations);

// error handler SIEMPRE al final
app.use(ErrorHandle);

export default app;

/**
 * Aqui definimos la configuración de nuestra aplicación Express, incluyendo middlewares y rutas.
 * También importamos y utilizamos middlewares personalizados para el registro de solicitudes y manejo de errores.
 */