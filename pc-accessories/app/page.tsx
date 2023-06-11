import React from "react";

import getProducts, {IProductParams} from "@/app/actions/getProducts";
import Container from "@/app/components/core/Container";
import EmptyState from "@/app/components/core/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/core/ClientOnly";
import getCategories from "@/app/actions/getCategories";
import FilterNavbar from "@/app/components/core/FilterNavbar";
import getBrands from "@/app/actions/getBrands";
import ProductsGrid from "@/app/components/products/ProductsGrid";


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
            <FilterNavbar brands={brands} products={products}/>
            <Container>
                <ProductsGrid products={products} currentUser={currentUser} params={searchParams}/>
            </Container>
        </ClientOnly>
    );
};
