'use client';


import ProductCard from "@/app/components/products/ProductCard";
import React, {useCallback} from "react";
import {SafeProduct, SafeUser} from "@/app/types";
import {useSearchParams} from "next/navigation";
import {IProductParams} from "@/app/actions/getProducts";


type ProductsGridProps = {
    products: SafeProduct[],
    currentUser: SafeUser|null,
    params: IProductParams
}


const ProductsGrid = ({products, currentUser, params}: ProductsGridProps) => {
    const getFilteredProducts = useCallback(() => {
        // @ts-ignore
        const specKeys = Object.keys(params).filter(key => key.startsWith('spec_'));
        if (!specKeys) return products;

        return products.filter(product => {
            for (const spec of specKeys) {
                const specKey = spec.replace('spec_', '');
                // @ts-ignore
                const specValue = params[spec];
                // @ts-ignore
                if (!product.specs || !product.specs[specKey] || !product.specs[specKey]
                    .toLowerCase().includes(specValue.toLowerCase())) {
                    return false;
                }
            }
            return true;
        });
    }, [params, products]);

    const filteredProducts = getFilteredProducts();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                            2xl:grid-cols-6 pt-40 gap-8">
            {filteredProducts.map((product: any) => (
                <ProductCard key={product.id} data={product} currentUser={currentUser}/>
            ))}
        </div>
    )
};


export default ProductsGrid;
