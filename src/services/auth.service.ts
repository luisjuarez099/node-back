import { prisma } from "../configuration/prisma.config";
import bcrypt from "bcrypt";
import * as jose from "jose";

export const registerUser = async ({ name, email, passwd }: { name: string; email: string; passwd: string }) => {

    const hashedPassword = await bcrypt.hash(passwd, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            passwd: hashedPassword,
            role: "USER"
        }
    });

    return newUser;
};

export const loginUser = async ({ email, passwd }: { email: string; passwd: string }) => {

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Credenciales inválidas");
    }

    const validPassword = await bcrypt.compare(passwd, user.passwd);

    if (!validPassword) {
        throw new Error("Credenciales inválidas");
    }

    const secret = new TextEncoder().encode(process.env.JWT_TOKEN);

    const token = await new jose.SignJWT({
        sub: user.id.toString(),
        role: user.role
    })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("2h")
        .sign(secret);

    return token;
};