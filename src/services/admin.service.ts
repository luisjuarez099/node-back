import { prisma } from "../configuration/prisma.config";
import { Prisma, TimeBlock } from "../generated/prisma/client";

/**
 * 
 * @param data 
 * @returns 
 */

export const createTimeBlocksService = async (data: Prisma.TimeBlockCreateInput): Promise<TimeBlock> => {

    return await prisma.timeBlock.create({ data });


};

export const listReservationsService = async () => {
    return await prisma.appointment.findMany({
        include: {
            user: true,
            timeBlock: true,
        }
    });
};