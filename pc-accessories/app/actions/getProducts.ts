import prisma from "@/app/libs/prismadb";
import {SafeBrand, SafeCategory} from "@/app/types";


export interface IProductParams {
    category?: string;
    text?: string;
}


export default async function getProducts(
    params: IProductParams,
    categories: SafeCategory[],
    brands?: SafeBrand[],
) {
    try {
        let query: any = {};
        addFilters(query, params, categories);

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


const addFilters = (query: any, params: IProductParams, categories: SafeCategory[]) => {
    let {
        category,
        text
    } = params;

    category = categories.find(x => x.name === category)?.id;
    if (category) {
        query.categoryId = category;
    }
    if (text) {
        query.OR = [
            {name: {contains: text, mode: "insensitive"}},
            {description: {contains: text, mode: "insensitive"}},
            {brand: {name: {contains: text, mode: "insensitive"}}},
            {category: {name: {contains: text, mode: "insensitive"}}},
        ];
    }
};
