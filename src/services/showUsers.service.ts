import { prisma } from "../configuration/prisma.config";

export const AllUsers = async () => {
    try {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    } catch (error) {

    }
}