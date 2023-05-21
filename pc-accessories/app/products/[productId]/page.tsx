import getCurrentUser from "@/app/actions/getCurrentUser";
import getProductById from "@/app/actions/getProductById";

import ClientOnly from "@/app/components/core/ClientOnly";
import React from "react";
import EmptyState from "@/app/components/core/EmptyState";


type IParams = {
    productId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const product = await getProductById(params);
    const currentUser = await getCurrentUser();

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

export default ListingPage;
