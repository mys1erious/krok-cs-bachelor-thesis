'use client';


import React, {useCallback} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {useRouter, useSearchParams} from "next/navigation";

import qs from "query-string";

import Modal from "@/app/components/modals/Modal";
import useCategoriesModal from "@/app/hooks/useCategoriesModal";
import {CategoryIcons} from "@/app/constants/constants";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import {Category} from "@prisma/client";
import {SafeCategory} from "@/app/types";


type CategoriesModalProps = {
    categories: SafeCategory[]
};


const CategoriesModal = ({categories}: CategoriesModalProps) => {
    const router = useRouter();
    const params = useSearchParams();
    const categoriesModal = useCategoriesModal();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            imageSrc: '',
            price: '',
        }
    });
    const category = watch('category');

    const setCustomValue = (id: string, value: any) => {
        if (value === category) value = 'disable';
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    };

    const setFilters = (categoryLabel: string) => {
        let currentQuery = {};
        if (params) currentQuery = qs.parse(params.toString());
        const updateQuery: any = {
            ...currentQuery,
            category: categoryLabel
        };

        if (params?.get('category') === categoryLabel)
            delete updateQuery.category;

        const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
        }, {skipNull: true});
        router.push(url);
    };

    const onSelectCategory = useCallback((label: string) => {
        setCustomValue('category', label);
        setFilters(label);
    }, [category, params, router]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.id} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => onSelectCategory(category)}
                            selected={category === item.name && category === params?.get('category')}
                            label={item.name}
                            description={item.description || ''}
                            // @ts-ignore
                            icon={CategoryIcons[item.name]}/>
                    </div>
                ))}
            </div>
        </div>
    );

    return(
        <Modal isOpen={categoriesModal.isOpen}
               onClose={categoriesModal.onClose}
               onSubmit={categoriesModal.onClose}
               actionLabel="Select"
               title="Choose Category"
               body={bodyContent}
        />
    )
};


export default CategoriesModal;
