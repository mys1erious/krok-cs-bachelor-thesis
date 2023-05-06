import prisma from "@/app/libs/prismadb";


export default async function getProducts() {
    try {
        // const products = await prisma.product.findMany({
        //     // orderBy: {createdAt: 'desc'}
        // });
        const products = await prisma.product.findMany();
        console.log(products);
        return products;
    } catch (error: any) {
        throw new Error(error);
    }
};
