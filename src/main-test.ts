import express, { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma";
import users from './mock/users.mock.json'
import { LoggerMiddleware } from './middlewares/logger'
import { authToken } from './middlewares/auth'
import { ErrorHandle } from './middlewares/errorHandle'
import bycript from 'bcrypt';
import * as jose from 'jose';
import morgan from 'morgan'
const app = express(); // Crear una instancia de Expres

app.use(express.json()); //Permite leer el body de una petición HTTP.
app.use(express.urlencoded({ extended: true })) //Funciona cuando enviamos datos de un formulario con el metodo=POST
app.use(morgan('dev'));
// app.use(LoggerMiddleware);
app.use(ErrorHandle);
const PORT = process.env.PORT || 3000

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
})

app.get('/', (req: Request, res: Response) => {
    res.send(`<h1>Curso express v223</h1>
        <p>Corre enel piero ${PORT}</p>
        `)
});

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    next(new Error('Este es un error de prueba'));

});

//Por parametro
//http://localhost:3000/users/8
app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    res.send(`Mostrar info del usuario id ${id}`);
});

//rutas dinamicas
// http://localhost:3000/search?terms=playa&category=colima
app.get('/search', (req: Request, res: Response) => {
    const terms = req.query.terms || 'SIn especificar';
    const category = req.query.category || 'Todas';

    res.json({ terminos: terms, categoria: category })
});

//procesar formularios

app.post('/formulario', (req: Request, res: Response) => {
    const name = req.body.nombre || 'ANYONE';
    const email = req.body.email || 'SIN EMAIl'

    res.json({ mensaje: "Datos mandados", data: { nombre: name, correo: email } });
});


//recibir datos de un objeto json

app.post('/api/data', (req: Request, res: Response) => {
    const data = req.body;

    //si no vienen los datos 

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron datos' });
    }

    //procesar los datos recibidos
    res.json({ mensaje: 'Datos recibidos correctamente', data });

})


app.get('/users', (req: Request, res: Response) => {

    res.json(users)
});

app.post('/users', (req: Request, res: Response) => {
    const newUser = req.body;
    try {
        //validar nombre de 3 caracteres y correo valido
        if (!newUser.name || newUser.name.length < 3) {
            return res.status(400).json({ error: 'El nombre debe tener al menos 3 caracteres' })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!newUser.email || !emailRegex.test(newUser.email)) {
            return res.status(400).json({ error: 'Correo no valido' })
        }

        //agregar el nuevo usuario a la lista de usuarios
        users.push(newUser);

        res.status(201).json({ mensaje: 'Usuario agregado correctamente', user: newUser })
    } catch (error) {

        res.status(500).json({ error: 'Error al agregar el usuario' })
    }


});

interface UserParams {
    id: string;
}

app.put('/users/:id', (req: Request<UserParams>, res: Response) => {
    const id = Number(req.params.id);

    const updateUser = req.body;

    console.log("BODY:", req.body);
    const userIndex = users.findIndex(user => user.id === id);
    console.log("INDEX:", userIndex);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    users[userIndex] = { ...users[userIndex], ...updateUser };
    console.log("UPDATED USER:", users[userIndex]);
    res.json(users)


});

app.delete('/users/:id', (req: Request<UserParams>, res: Response) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    users.splice(userIndex, 1);
    res.json({ mensaje: 'Usuario eliminado correctamente' })
});


app.get('/prisma/users', async (req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany();
        res.json(allUsers);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});


app.get('/protected-route', authToken, (req: Request, res: Response) => {
    res.json({ message: 'Acceso a ruta protegida concedido', user: req.user });
});

app.post('/registrar', async (req: Request, res: Response) => {


    try {
        const { name, email, passwd } = req.body;

        const hashedPassword = await bycript.hash(passwd, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwd: hashedPassword,
                role: 'USER'
            }
        });
        res.status(201).json({ mensaje: 'Usuario registrado correctamente', user: newUser })

    } catch (error) {

    }
});


app.post('/login', async (req: Request, res: Response) => {

    const { email, passwd } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return res.status(400).json({ error: 'Correo invalido o password' });

        //validar passwd con la BD

        const validPassword = await bycript.compare(passwd, user.passwd);

        if (!validPassword) return res.status(400).json({ error: 'Correo invalido o password' });

        //generar un token JWT
        const secret = new TextEncoder().encode(process.env.JWT_TOKEN);
        const token = await new jose.SignJWT({ sub: user.id.toString(), role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('2h')
            .sign(secret);

        res.json({ mensaje: 'Login exitoso', token });


    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el proceso de login' });
    }
})

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});