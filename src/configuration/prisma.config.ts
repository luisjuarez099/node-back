import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

export const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});
/**
 * Nos conectamos con prisma a Postgres
 * Aquí creamos una instancia de PrismaClient utilizando el adaptador PrismaPg para conectarnos a una base de datos PostgreSQL.
 * 
 */