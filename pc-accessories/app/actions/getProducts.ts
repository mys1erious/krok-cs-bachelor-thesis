import prisma from "@/app/libs/prismadb";
import {SafeBrand, SafeCategory, SafeProduct} from "@/app/types";
import {OrderByChoices, strToNumber} from "@/app/utils";
import {Product} from "@prisma/client";


export interface IProductParams {
    category?: string;
    brand?: string;
    text?: string;
    min_price?: string;
    max_price?: string;
    order_by?: string;
}


export default async function getProducts(
    params: IProductParams,
    categories: SafeCategory[],
    brands: SafeBrand[],
) {
    try {
        let query: any = {};
        addFilters(query, params, categories, brands);

        let products = await prisma.product.findMany({
            where: query,
            orderBy: addOrderBy(params.order_by)
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


const addOrderBy = (orderByVal: string | undefined) => {
    const orderByLookup = {
        [OrderByChoices.DATE_ADDED]: {createdAt: 'desc'},
        [OrderByChoices.PRICE_ASC]: {price: 'asc'},
        [OrderByChoices.PRICE_DESC]: {price: 'desc'},
        [OrderByChoices.VIEW_COUNTER]: {viewCounter: 'desc'},
        [OrderByChoices.ALPHABET]: {name: 'asc'},
    };
    if (orderByVal && orderByLookup.hasOwnProperty(orderByVal)) {
        // @ts-ignore
        return orderByLookup[orderByVal];
    }

    if (!orderByVal) return {createdAt: 'desc'};
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
        if (val) query.price = {...query.price, gte: val};
    }
    if (max_price) {
        const val = strToNumber(max_price);
        if (val) query.price = {...query.price, lte: val};
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
