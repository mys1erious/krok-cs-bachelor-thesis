'use client';


import Button from "@/app/components/core/Button";
import React from "react";
import useAdminBrandModal from "@/app/hooks/useAdminBrandModal";
import useAdminCategoryModal from "@/app/hooks/useAdminCategoryModal";
import useAdminProductModal from "@/app/hooks/useAdminProductModal";

const AddObjectsContainer = () => {
    const brandModal = useAdminBrandModal();
    const categoryModal = useAdminCategoryModal();
    const productModal = useAdminProductModal();

    return (
            <div className="flex flex-col items-start min-h-screen w-full pt-24 space-y-2 px-2
                            border-r border-gray-300">
                <Button label="Add Brand" onClick={brandModal.onOpen} small/>
                <Button label="Add Category" onClick={categoryModal.onOpen} small/>
                <Button label="Add Product" onClick={productModal.onOpen} small/>
            </div>
    );
};

export default AddObjectsContainer;
