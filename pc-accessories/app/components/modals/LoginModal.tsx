'use client';

import React, {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {FcGoogle} from "react-icons/fc";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

import axios from "axios";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {Exceptions, Success} from "@/app/constants/constants";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/core/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/core/Button";


const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success(Success.SIGNED_IN);
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error)
                toast.error(callback.error);
        });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subtitle="Login in your account" />
            <Input id="email" label="Email" disabled={isLoading}
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
                        Don't have an account?
                    </div>
                    <div onClick={registerModal.onClose}
                         className="text-neutral-800 cursor-pointer hover:underline">
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal disabled={isLoading}
               isOpen={loginModal.isOpen}
               title="Sign In"
               actionLabel="Continue"
               onClose={loginModal.onClose}
               onSubmit={handleSubmit(onSubmit)}
               body={bodyContent}
               footer={footerContent}
        />
    );
};


export default LoginModal;