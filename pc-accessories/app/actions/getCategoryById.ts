import prisma from "@/app/libs/prismadb";


export default async function getCategoryById(categoryId: string) {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            }
        });

        if (!category) {
            return null;
        }

        return {
            ...category,
            createdAt: category.createdAt.toString(),
            updatedAt: category.updatedAt.toString(),
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
