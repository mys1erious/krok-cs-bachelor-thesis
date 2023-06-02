import getCurrentUser from "@/app/actions/getCurrentUser";
import getProductById from "@/app/actions/getProductById";

import ClientOnly from "@/app/components/core/ClientOnly";
import React from "react";
import EmptyState from "@/app/components/core/EmptyState";


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

        // @ts-ignore
        return (
            <ClientOnly>
                <div className="pt-[100px]">{product.name}</div>
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
