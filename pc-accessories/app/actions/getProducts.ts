import prisma from "@/app/libs/prismadb";
import {SafeBrand, SafeCategory} from "@/app/types";
import {strToNumber} from "@/app/utils";


export interface IProductParams {
    category?: string;
    brand?: string;
    text?: string;
    min_price?: string;
    max_price?: string;
}


export default async function getProducts(
    params: IProductParams,
    categories: SafeCategory[],
    brands: SafeBrand[],
) {
    try {
        let query: any = {};
        addFilters(query, params, categories, brands);

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


const addFilters = (query: any, params: IProductParams, categories: SafeCategory[], brands: SafeBrand[]) => {
    let {
        category,
        brand,
        text,
        min_price,
        max_price
    } = params;

    category = categories.find(x => x.name === category)?.id;
    if (category) {
        query.categoryId = category;
    }

    brand = brands.find(x => x.name === brand)?.id;
    if (brand) {
        query.brandId = brand;
    }
    if (min_price) {
        const val = strToNumber(min_price);
        if (val) query.price = { ...query.price, gte: val };
    }
    if (max_price) {
        const val = strToNumber(max_price);
        if (val) query.price = { ...query.price, lte: val };
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
