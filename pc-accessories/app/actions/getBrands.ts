import prisma from "@/app/libs/prismadb";


export default async function getBrands() {
    try {
        return await prisma.brand.findMany({
            orderBy: {createdAt: 'asc'}
        });
    } catch (error: any) {
        throw new Error(error);
    }
};
