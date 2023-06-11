import prisma from "@/app/libs/prismadb";

type IParams = {
    productId?: string;
}

export default async function getProductById(
    params: IParams
) {
    try {
        const { productId } = params;

        const product = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                viewCounter: {
                    increment: 1
                },
            },
        });

        if (!product) {
            return null;
        }

        return {
            ...product,
            createdAt: product.createdAt.toString(),
            updatedAt: product.updatedAt.toString(),
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
