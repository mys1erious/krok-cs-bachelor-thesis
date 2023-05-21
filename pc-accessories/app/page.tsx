import React from "react";

import getProducts from "@/app/actions/getProducts";
import Container from "@/app/components/core/Container";
import EmptyState from "@/app/components/core/EmptyState";
import ProductCard from "@/app/components/products/ProductCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/core/ClientOnly";
import getCategories from "@/app/actions/getCategories";


export default async function Home() {
    const products = await getProducts();
    const currentUser = await getCurrentUser();

    if (products.length === 0) return (
        <ClientOnly>
            <EmptyState showReset/>
        </ClientOnly>
    );

    return (
        <ClientOnly>
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                            2xl:grid-cols-6 pt-24 gap-8">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} data={product} currentUser={currentUser}/>
                    ))}
                </div>
            </Container>
        </ClientOnly>
    );
};
