import React from "react";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteProducts from "@/app/actions/getFavoriteProducts";
import ClientOnly from "@/app/components/core/ClientOnly";
import FavoritesClient from "@/app/favorites/FavoritesClient";


const ProductPage = async () => {
    const products = await getFavoriteProducts();
    const currentUser = await getCurrentUser();

    return (
        <div className="pt-24">
            <ClientOnly>
                <FavoritesClient products={products} currentUser={currentUser}/>
            </ClientOnly>
        </div>
    );
}

export default ProductPage;
