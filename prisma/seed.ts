import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "../src/generated/prisma";

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

async function main() {
    // Limpiar tablas en orden correcto (por dependencias)
    await prisma.appointment.deleteMany();
    await prisma.timeBlock.deleteMany();
    await prisma.user.deleteMany();

    console.log("🧹 Tablas limpiadas");

    // Seed: Users
    const users = await Promise.all([
        prisma.user.create({
            data: { name: "Luis Juarez", email: "luis@email.com", passwd: "hashed_pass_1", role: Role.ADMIN }
        }),
        prisma.user.create({
            data: { name: "Ana Lopez", email: "ana@email.com", passwd: "hashed_pass_2", role: Role.USER }
        }),
        prisma.user.create({
            data: { name: "Carlos Ramirez", email: "carlos@email.com", passwd: "hashed_pass_3", role: Role.USER }
        }),
        prisma.user.create({
            data: { name: "Maria Torres", email: "maria@email.com", passwd: "hashed_pass_4", role: Role.USER }
        }),
        prisma.user.create({
            data: { name: "Pedro Gomez", email: "pedro@email.com", passwd: "hashed_pass_5", role: Role.USER }
        }),
    ]);

    console.log(`👤 ${users.length} usuarios creados`);

    // Seed: TimeBlocks
    const timeBlocks = await Promise.all([
        prisma.timeBlock.create({
            data: {
                startTime: new Date("2025-06-10T08:00:00"),
                endTime: new Date("2025-06-10T09:00:00"),
            }
        }),
        prisma.timeBlock.create({
            data: {
                startTime: new Date("2025-06-10T09:00:00"),
                endTime: new Date("2025-06-10T10:00:00"),
            }
        }),
        prisma.timeBlock.create({
            data: {
                startTime: new Date("2025-06-11T10:00:00"),
                endTime: new Date("2025-06-11T11:00:00"),
            }
        }),
        prisma.timeBlock.create({
            data: {
                startTime: new Date("2025-06-11T14:00:00"),
                endTime: new Date("2025-06-11T15:00:00"),
            }
        }),
        prisma.timeBlock.create({
            data: {
                startTime: new Date("2025-06-12T16:00:00"),
                endTime: new Date("2025-06-12T17:00:00"),
            }
        }),
    ]);

    console.log(`🕐 ${timeBlocks.length} bloques de tiempo creados`);

    // Seed: Appoiments
    const appoiments = await Promise.all([
        prisma.appointment.create({
            data: {
                date: new Date("2025-06-10T08:00:00"),
                userId: users[1].id,        // Ana
                timeBlockId: timeBlocks[0].id,
            }
        }),
        prisma.appointment.create({
            data: {
                date: new Date("2025-06-10T09:00:00"),
                userId: users[2].id,        // Carlos
                timeBlockId: timeBlocks[1].id,
            }
        }),
        prisma.appointment.create({
            data: {
                date: new Date("2025-06-11T10:00:00"),
                userId: users[3].id,        // Maria
                timeBlockId: timeBlocks[2].id,
            }
        }),
        prisma.appointment.create({
            data: {
                date: new Date("2025-06-11T14:00:00"),
                userId: users[4].id,        // Pedro
                timeBlockId: timeBlocks[3].id,
            }
        }),
        prisma.appointment.create({
            data: {
                date: new Date("2025-06-12T16:00:00"),
                userId: users[1].id,        // Ana (segunda cita)
                timeBlockId: timeBlocks[4].id,
            }
        }),
    ]);

    console.log(`📅 ${appoiments.length} citas creadas`);
    console.log("✅ Seed ejecutado correctamente");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });