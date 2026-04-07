import { Request, Response } from "express";
import users from "../mock/users.mock.json";

export const getUsers = (req: Request, res: Response) => {
    res.json(users);
};

export const getUserById = (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);

};