'use client';


import {useRouter} from "next/navigation";
import React, {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {Exceptions, Success} from "@/app/constants/constants";
import Heading from "@/app/components/core/Heading";
import Input from "@/app/components/inputs/Input";
import Modal from "@/app/components/modals/Modal";
import useAdminProductModal from "@/app/hooks/useAdminProductModal";
import SelectInput from "@/app/components/inputs/SelectInput";
import {SafeBrand, SafeCategory} from "@/app/types";
import aws from "@/app/api/upload-img";


type AdminProductModalProps = {
    brands: SafeBrand[],
    categories: SafeCategory[],
};


const AdminProductModal = ({brands, categories}: AdminProductModalProps) => {
    const router = useRouter();
    const productModal = useAdminProductModal();

    const [isLoading, setIsLoading] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState(brands[0].id);
    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
    const [file, setFile] = useState<File>();

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

    const getCurrentSpecs = useCallback( () => {
        const category = categories.find(category => category.id === selectedCategory);
        if (category) return category.specsTemplate as object;
        return {};
    }, [selectedCategory]);

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        const imageSrc = await uploadImage();
        if (!imageSrc) {
            setIsLoading(false);
            return;
        }

        data = parseSpecs(data);
        data.imageSrc = imageSrc;
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
    };

    const storeImage = (e: any) => {
        setFile(e.target.files[0]);
    };

    const uploadImage = async() => {
        const responseData = await aws(file);

        const responseMsg = String(responseData);
        if (responseMsg === Success.IMAGE_UPLOADED) {
            toast.success(String(responseData));
            const fileName = file?.name;
            // @ts-ignore
            setFile(null);
            // @ts-ignore
            return getImageUrl(fileName);
        }
        else {
            toast.error(String(responseData));
            // @ts-ignore
            setFile(null);
            return false;
        }
    };

    const getImageUrl = (name: string) => {
        return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${name}`;
    }

    const parseSpecs = (original: any) => {
        const specs = {};
        const specsTemplate = getCurrentSpecs();

        for (let key of Object.keys(original)) {
            if (key.startsWith('spec_')) {
                const spec = key.replace('spec_', '');
                if (!Object.keys(specsTemplate).includes(spec)) continue;
                // @ts-ignore
                specs[spec] = original[key];
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
            <div className="relative mt-1">
                <label htmlFor="file-input" id="custom-button">
                    <span className="font-light p-1 bg-white border-2 border-black rounded-md outline-none transition
                       hover:bg-red-600 hover:opacity-80 hover:text-white">
                        Choose Image
                    </span>
                    <span>{file?.name}</span>
                </label>
                <input  className="hidden" id="file-input" type="file" onChange={(e) => storeImage(e)}/>
            </div>
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
