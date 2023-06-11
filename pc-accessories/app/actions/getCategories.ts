import prisma from "@/app/libs/prismadb";


export default async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {createdAt: 'asc'}
        });

        return categories.map((category) => ({
            ...category,
            createdAt: category.createdAt.toISOString(),
            updatedAt: category.updatedAt.toISOString(),
        }));

    } catch (error: any) {
        throw new Error(error);
    }
};
