'use client';


import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {Exceptions, Success} from "@/app/constants/constants";
import Heading from "@/app/components/core/Heading";
import Input from "@/app/components/inputs/Input";
import Modal from "@/app/components/modals/Modal";
import useAdminProductModal from "@/app/hooks/useAdminProductModal";
import {Brand, Category} from "@prisma/client";
import SelectInput from "@/app/components/inputs/SelectInput";


type AdminProductModalProps = {
    brands: Brand[],
    categories: Category[],
};


const AdminProductModal = ({brands, categories}: AdminProductModalProps) => {
    const router = useRouter();
    const productModal = useAdminProductModal();

    const [isLoading, setIsLoading] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState(brands[0].id);
    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brandId: '',
            categoryId: '',
            imageSrc: '',
            price: 0,
        }
    });

    const getCurrentSpecs = () => {
        const category = categories.find(category => category.id === selectedCategory);
        if (category) return category.specsTemplate as object;
        return {};
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        // TODO: REMOVE
        data = parseSpecs(data);
        data.imageSrc = 'https://games-sales.s3.eu-west-2.amazonaws.com/projects/pc_accessories/products/3090_1.jpg';
        data.brandId = selectedBrand;
        data.categoryId = selectedCategory;

        axios.post('/api/products/', data)
            .then(() => {
                toast.success(Success.PRODUCT_CREATED);
                router.refresh();
                reset();
                productModal.onClose();
            })
            .catch(() => {
                toast.error(Exceptions.PRODUCT_CREATED_ERROR);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const parseSpecs = (original: any) => {
        const specs = {};

        for (let key of Object.keys(original)) {
            if (key.startsWith('spec_')) {
                // @ts-ignore
                specs[key.slice(5)] = original[key];
                delete original[key];
            }
        }

        original['specs'] = specs;
        return original;
    };

    const bodyContent = (
        <div className="flex flex-col gap-1">
            <Heading title="Enter Product info" />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required/>
            <Input
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <SelectInput objects={brands} setSelectedObject={setSelectedBrand}/>
            <SelectInput objects={categories} setSelectedObject={setSelectedCategory}/>
            {Object.keys(getCurrentSpecs()).map((key) => (
                <Input key={key}
                    id={`spec_${key}`}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            ))}
            <Input
                id="price"
                label="Price"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="number"
            />
            {/*<div>IMAGE</div>*/}
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={productModal.isOpen}
            title="Add Product"
            actionLabel="Create"
            onSubmit={handleSubmit(onSubmit)}
            onClose={productModal.onClose}
            body={bodyContent}
        />
    );
};


export default AdminProductModal;
