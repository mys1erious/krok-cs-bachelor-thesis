import prisma from "@/app/libs/prismadb";


export default async function getCategories() {
    try {
        return await prisma.category.findMany({
            orderBy: {createdAt: 'asc'}
        });
    } catch (error: any) {
        throw new Error(error);
    }
};
