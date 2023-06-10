import React from "react";

import getProducts, {IProductParams} from "@/app/actions/getProducts";
import Container from "@/app/components/core/Container";
import EmptyState from "@/app/components/core/EmptyState";
import ProductCard from "@/app/components/products/ProductCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/core/ClientOnly";
import getCategories from "@/app/actions/getCategories";
import FilterNavbar from "@/app/components/core/FilterNavbar";
import getBrands from "@/app/actions/getBrands";


interface HomeProps {
    searchParams: IProductParams,
}


export default async function Home({searchParams}: HomeProps) {
    const categories = await getCategories();
    const brands = await getBrands();
    const products = await getProducts(searchParams, categories, brands);
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
                            2xl:grid-cols-6 pt-40 gap-8">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} data={product} currentUser={currentUser}/>
                    ))}
                </div>
            </Container>
        </ClientOnly>
    );
};
