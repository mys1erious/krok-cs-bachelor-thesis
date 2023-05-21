import prisma from "@/app/libs/prismadb";


export default async function getProducts() {
    try {
        // const products = await prisma.product.findMany({
        //     // orderBy: {createdAt: 'desc'}
        // });
        return await prisma.product.findMany();
    } catch (error: any) {
        throw new Error(error);
    }
};
