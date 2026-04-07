import { JwtPayload } from "jose";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

/**
 * Aquí extendemos la interfaz Request de Express para incluir una propiedad opcional "user"
 *  que puede contener el payload del JWT después de la autenticación.
 * Esto nos permite acceder a la información del usuario autenticado en cualquier parte de nuestra aplicación Express
 *  sin necesidad de redefinir la interfaz Request cada vez.
 */