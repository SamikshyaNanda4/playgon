// lib/prisma.ts
//taken from prisma docs only instead of import { PrismaClient } from "@prisma/client/extension"; we take from @generated folder
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;