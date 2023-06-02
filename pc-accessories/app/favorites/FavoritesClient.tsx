'use client';

import {SafeProduct, SafeUser} from "@/app/types";
import React, {useContext} from "react";
import ProductCard from "@/app/components/products/ProductCard";
import Container from "@/app/components/core/Container";
import Heading from "@/app/components/core/Heading";
import {LocaleContext} from "@/app/contexts/LocaleContext";
import ClientOnly from "@/app/components/core/ClientOnly";
import EmptyState from "@/app/components/core/EmptyState";

interface FavoritesClientProps {
    products: SafeProduct[],
    currentUser?: SafeUser | null,
}

const FavoritesClient = ({products, currentUser}: FavoritesClientProps) => {
    // @ts-ignore
    const { locale } = useContext(LocaleContext);

    if (products.length === 0) {
        return (
                <EmptyState title={locale.noFavoritesFound} subtitle={locale.noFavoritesFoundMsg}/>
        );
    }

    return (
        <Container>
            <Heading title={locale.favorites} subtitle={locale.listOfYourFavorites} center/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                            2xl:grid-cols-6 gap-8">
                {products.map((product: any) => (
                    <ProductCard currentUser={currentUser} key={product.id} data={product}/>
                ))}
            </div>
        </Container>
    );
}

export default FavoritesClient;
