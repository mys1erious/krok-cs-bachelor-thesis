'use client';

import {useRouter} from "next/navigation";
import useAdminBrandModal from "@/app/hooks/useAdminBrandModal";
import React, {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {Exceptions, Success} from "@/app/constants/constants";
import Heading from "@/app/components/core/Heading";
import Input from "@/app/components/inputs/Input";
import Modal from "@/app/components/modals/Modal";

const AdminBrandModal = () => {
    const router = useRouter();
    const brandModal = useAdminBrandModal();

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
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/brands/', data)
            .then(() => {
                toast.success(Success.BRAND_CREATED);
                router.refresh();
                reset();
                brandModal.onClose();
            })
            .catch(() => {
                toast.error(Exceptions.BRAND_CREATED_ERROR);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-1">
            <Heading title="Enter Brand name and description" />
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
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={brandModal.isOpen}
            title="Add Brand"
            actionLabel="Create"
            onSubmit={handleSubmit(onSubmit)}
            onClose={brandModal.onClose}
            body={bodyContent}
        />
    );
};


export default AdminBrandModal;
