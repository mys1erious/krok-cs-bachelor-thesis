import React from "react";

import AdminBrandModal from "@/app/components/modals/AdminBrandModal";
import ClientOnly from "@/app/components/core/ClientOnly";
import AdminCategoryModal from "@/app/components/modals/AdminCategoryModal";
import AdminProductModal from "@/app/components/modals/AdminProductModal";
import getBrands from "@/app/actions/getBrands";
import getCategories from "@/app/actions/getCategories";


export default async function AdminLayout({children}: { children: React.ReactNode }) {
    const brands = await getBrands();
    const categories = await getCategories();

    return (
        <>
            <ClientOnly>
                <AdminBrandModal/>
                <AdminCategoryModal/>
                <AdminProductModal brands={brands} categories={categories}/>
            </ClientOnly>
            {children}
        </>
    );
};
