import { prisma } from "../configuration/prisma.config";
import { Prisma } from "../generated/prisma";
import { UpdateReservationDTO, CreateReservationDTO } from "../types/reservation.types";


export const createReservationService = async (data: CreateReservationDTO) => {

    try {
        const { date, timeBlockId } = data;
        const conflict = await prisma.appointment.findFirst({
            where: {
                date: date,
                timeBlockId: timeBlockId, // Asegúrate de que el ID del bloque de tiempo esté presente
            },
        });

        if (conflict) throw new Error("Ya existe una reserva para ese bloque de tiempo y fecha");

        return await prisma.appointment.create({ data });
    } catch (error) {

        console.error("Error en createReservationService:", error);
        throw error; // Re-lanzar el error para que el controlador pueda manejarlo

    }

};


export const getReservationService = async (id: number) => {

    return await prisma.appointment.findUnique({ where: { id } });
};




export const updateReservationService = async (id: number, data: UpdateReservationDTO) => {

    try {
        const { date, timeBlockId } = data;
        const conflict = await prisma.appointment.findFirst({
            where: {
                date: date,
                timeBlockId: timeBlockId,
                id: { not: id } // Excluir la reserva actual del conflicto, osea , que no se compare con ella misma
            },
        });

        if (conflict) throw new Error("Ya existe una reserva para ese bloque de tiempo y fecha");

        return await prisma.appointment.update({ where: { id }, data });
    } catch (error) {
        console.error("Error en updateReservationService:", error);
        throw error; // Re-lanzar el error para que el controlador pueda manejarlo
    }


}


export const deleteReservationService = async (id: number) => {

    return await prisma.appointment.delete({ where: { id } });
}