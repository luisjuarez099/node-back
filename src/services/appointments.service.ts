import { prisma } from "../configuration/prisma.config";
import { Prisma } from "../generated/prisma";

export const getAppointmentServiceById = async (appointmentId: number) => {
    try {
        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId },
            include: { timeBlock: true }
        });
        return appointment;
    } catch (error) {

        throw new Error("Error al obtener la cita por ID: " + error);

    }
};