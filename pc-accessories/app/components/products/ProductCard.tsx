'use client';

import React, {useCallback} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

import {Product} from "@prisma/client";
import {SafeProduct, SafeUser} from "@/app/types";
import HeartButton from "@/app/components/core/HeartButton";


type ProductCardProps = {
    data: SafeProduct;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
    largeText?: boolean;
};


const ProductCard = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId="",
    currentUser,
    largeText
}: ProductCardProps) => {
    const router = useRouter();

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) return;

        onAction?.(actionId);
    }, [onAction, actionId, disabled]);

    return (
        <div className="col-span-1 cursor-pointer"
             onClick={() => router.push(`/products/${data.id}/`)}>
            <div className="flex flex-col gap-2 w-full">
                <div className="group aspect-square w-full relative overflow-hidden rounded-xl border border-gray-200
                                shadow-md">
                    <Image className="object-cover h-[90%] w-full group-hover:scale-110 transition"
                           alt="Product" src={data.imageSrc} fill />
                    <div className="absolute top-3 right-3">
                        <HeartButton productId={data.id} currentUser={currentUser}/>
                    </div>
                </div>
                <div className={`hover:font-bold hover:underline ${largeText ? "text-lg" : "text-sm"}`}>
                    {data.name}
                    <div>
                        $ {data.price}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductCard;
