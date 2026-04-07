import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

async function main() {

    // await prisma.user.createMany({
    //     data: [
    //         { name: "Luis Juarez", email: "luis1@email.com" },
    //         { name: "Ana Lopez", email: "ana@email.com" },
    //         { name: "Carlos Ramirez", email: "carlos@email.com" },
    //         { name: "Maria Torres", email: "maria@email.com" },
    //         { name: "Pedro Gomez", email: "pedro@email.com" },
    //         { name: "Sofia Martinez", email: "sofia@email.com" },
    //         { name: "Jorge Castillo", email: "jorge@email.com" },
    //         { name: "Laura Hernandez", email: "laura@email.com" },
    //         { name: "Diego Navarro", email: "diego@email.com" },
    //         { name: "Valeria Cruz", email: "valeria@email.com" }
    //     ]
    // }); 

    await prisma.user.deleteMany();

    console.log("Seed ejecutado correctamente");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });