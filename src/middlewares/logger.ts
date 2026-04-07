import { Request, Response } from "express";

export const LoggerMiddleware = (req: Request, res: Response, next: () => void) => {
    const timeStamp = new Date().toISOString();

    console.log(`[${timeStamp}], ${req.method} ${req.url} ${req.ip}`);

    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Duracion ${timeStamp} Resp: ${res.statusCode}
            - ${duration} ms`)
    });
    next();
}

/**
 * 💻Acá un poco más de lo que trae el objeto request:

    req.methodLa cadena del método HTTP de la solicitud (ej: 'GET', 'POST', 'PUT').
    req.urlLa URL de la solicitud (ruta y cadena de consulta) solicitada por el cliente.
    req.originalUrlSimilar a req.url, pero contiene la URL completa original de la solicitud (útil en routers montados).
    req.protocolEl protocolo de la solicitud (ej: 'http' o 'https').
    req.hostnameEl nombre de host derivado del encabezado Host HTTP.
    req.pathContiene solo la parte de la ruta de la URL de la solicitud (sin el query string).
    req.ipLa dirección IP remota del cliente.
    req.appUna referencia a la instancia de la aplicación Express que está manejando la solicitud.
    req.get(field)Devuelve el valor del encabezado de la solicitud especificado por field (ej: req.get('Content-Type')).
    req.is(type)Comprueba si el tipo de contenido (Content-Type) de la solicitud coincide con el tipo MIME dado.
    req.accepts(types)Comprueba si el cliente acepta los tipos MIME, charsets, codificaciones o idiomas especificados.

 */