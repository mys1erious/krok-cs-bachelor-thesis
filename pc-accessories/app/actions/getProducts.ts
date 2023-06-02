import prisma from "@/app/libs/prismadb";
import {SafeBrand, SafeCategory} from "@/app/types";


export interface IProductParams {
    category?: string;
}


export default async function getProducts(
    params: IProductParams,
    categories: SafeCategory[],
    brands?: SafeBrand[],
) {
    try {
        console.log(params)

        let query: any = {};

        // for (const param in params) {
        //     if (param) query[param] = param;
        // }

        let {
            category,
        } = params;

        category = categories.find(x => x.name === category)?.id;
        if (category) {
            query.categoryId = category;
        }

        const products = await prisma.product.findMany({
            where: query,
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
