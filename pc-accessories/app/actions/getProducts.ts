import prisma from "@/app/libs/prismadb";


export default async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {createdAt: 'desc'}
        });

        return products.map((product) => ({
            ...product,
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString(),
        }));
    } catch (error: any) {
        throw new Error(error);
    }
};
