import express from "express";
import morgan from "morgan";

import { LoggerMiddleware } from "./middlewares/logger";
import { ErrorHandle } from "./middlewares/errorHandle";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import showUsersRoutes from "./routes/showUsers.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(LoggerMiddleware);

// rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/protected", protectedRoutes);
app.use("/show", showUsersRoutes);

// error handler SIEMPRE al final
app.use(ErrorHandle);

export default app;

/**
 * Aqui definimos la configuración de nuestra aplicación Express, incluyendo middlewares y rutas.
 * También importamos y utilizamos middlewares personalizados para el registro de solicitudes y manejo de errores.
 */