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
import useAdminCategoryModal from "@/app/hooks/useAdminCategoryModal";


const AdminCategoryModal = () => {
    const router = useRouter();
    const categoryModal = useAdminCategoryModal();

    const [isLoading, setIsLoading] = useState(false);

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
            specsTemplate: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        try {
            data.specsTemplate = buildSpecsTemplate(data.specsTemplate);
        } catch (e) {
            toast.error(Exceptions.ERROR_PARSING_SPECS)
        }

        axios.post('/api/categories/', data)
            .then(() => {
                toast.success(Success.BRAND_CREATED);
                router.refresh();
                reset();
                categoryModal.onClose();
            })
            .catch(() => {
                toast.error(Exceptions.BRAND_CREATED_ERROR);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const buildSpecsTemplate = (specsStr: string) => {
        return specsStr.split(',').reduce((accumulator, current) => {
            // @ts-ignore
            accumulator[current] = '';
            return accumulator;
        }, {});
    };

    const bodyContentSubtitle = 'Specs Template should be a list of values separated by comma' +
        ' e.g.: model,interface,memory,chipset';
    const bodyContent = (
        <div className="flex flex-col gap-1">
            <Heading title="Create Category" subtitle={bodyContentSubtitle} />
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
            <Input
                id="specsTemplate"
                label="Specs Template"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={categoryModal.isOpen}
            title="Add Category"
            actionLabel="Create"
            onSubmit={handleSubmit(onSubmit)}
            onClose={categoryModal.onClose}
            body={bodyContent}
        />
    );
};


export default AdminCategoryModal;
