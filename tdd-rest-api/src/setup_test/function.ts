import prisma from './client';
import { prismaMock } from './singleton';

export const getUser = async () => {
    console.log("Mock dipanggil:", prisma === prismaMock);
    return await prisma.user.findMany();
};
