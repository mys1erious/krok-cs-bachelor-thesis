import getCurrentUser from "@/app/actions/getCurrentUser";
import getProductById from "@/app/actions/getProductById";

import ClientOnly from "@/app/components/core/ClientOnly";
import React from "react";
import EmptyState from "@/app/components/core/EmptyState";
import ProductCard from "@/app/components/products/ProductCard";
import getBrandById from "@/app/actions/getBrandById";
import getCategoryById from "@/app/actions/getCategoryById";
import {unslugify} from "@/app/utils";
import DetailList from "@/app/components/products/DetailList";


type IParams = {
    productId?: string;
}

const ProductPage = async ({ params }: { params: IParams }) => {
    const currentUser = await getCurrentUser();

    try {
        const product = await getProductById(params);

        if (!product) {
            return (
                <ClientOnly>
                    <EmptyState />
                </ClientOnly>
            );
        }

        const brand = await getBrandById(product.brandId);
        const category = await getCategoryById(product.categoryId);

        return (
            <ClientOnly>
                <div className="flex flex-col justify-around pt-40 mx-8 gap-8 h-full lg:flex-row lg:gap-0">
                    <div className="min-w-[w100px] w-full max-w-[300px] mx-auto lg:mx-0 text-center lg:text-left">
                        <ProductCard currentUser={currentUser} key={product.id} data={product} largeText/>
                    </div>
                    <DetailList product={product} brand={brand} category={category} />
                    {/*<div className="rounded-xl shadow-md border border-gray-300 min-w-[50%]">*/}
                    {/*    <ul className="p-4">*/}
                    {/*        <li>Description: {product.description}</li>*/}
                    {/*        <li>Brand: {brand?.name}</li>*/}
                    {/*        <li>Category: {category?.name}</li>*/}
                    {/*        /!* TODO: FIX *!/*/}
                    {/*        {Object.entries(product.specs).map(([key, val]) => (*/}
                    {/*            <li key={key}>*/}
                    {/*                <span className="font-bold">{unslugify(key)}: </span>*/}
                    {/*                <span>{val}</span>*/}
                    {/*            </li>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            </ClientOnly>
        );
    }
    catch (e) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }
}

export default ProductPage;
