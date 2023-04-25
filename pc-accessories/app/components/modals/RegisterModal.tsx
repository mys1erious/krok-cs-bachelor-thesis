'use client';

import React, {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {FcGoogle} from "react-icons/fc";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

import axios from "axios";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/core/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/core/Button";
import {Exceptions} from "@/app/constants/constants";


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/sign-up/', data).then(() => {
            registerModal.onClose();
        }).catch((error) => {
            toast.error(Exceptions.SOMETHING_WENT_WRONG);
        }).finally(() => {
            setIsLoading(false);
        })
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome" subtitle="Create an account" />
            <Input id="email" label="Email" disabled={isLoading}
                   register={register} errors={errors} required/>
            <Input id="name" label="Name" disabled={isLoading}
                   register={register} errors={errors} required/>
            <Input id="password" label="Password" disabled={isLoading}
                   register={register} errors={errors} required type="password"/>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button outline label="Continue with Google" icon={FcGoogle}
                    onClick={() => signIn('google')}/>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={registerModal.onClose}
                         className="text-neutral-800 cursor-pointer hover:underline">
                        Sign In
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal disabled={isLoading}
               isOpen={registerModal.isOpen}
               title="Sign Up"
               actionLabel="Continue"
               onClose={registerModal.onClose}
               onSubmit={handleSubmit(onSubmit)}
               body={bodyContent}
               footer={footerContent}
        />
    );
};


export default RegisterModal;
