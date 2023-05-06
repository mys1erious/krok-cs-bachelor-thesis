'use client';

import React, {useCallback} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

import {Product} from "@prisma/client";
import {SafeUser} from "@/app/types";
import HeartButton from "@/app/components/core/HeartButton";


type ProductCardProps = {
    data: Product;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
};


const ProductCard = ({
    data,
    onAction,
    disabled,
    actionLabel,
    actionId="",
    currentUser
}: ProductCardProps) => {
    const router = useRouter();

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) return;

        onAction?.(actionId);
    }, [onAction, actionId, disabled]);

    return (
        <div className="col-span-1 cursor-pointer group border border-black border-solid"
             onClick={() => router.push(`/products/${data.id}/`)}>
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image className="object-cover h-full w-full group-hover:scale-110 transition"
                           alt="Product" src={data.imageSrc} fill />
                    <div className="absolute top-3 right-3">
                        <HeartButton productId={data.id} currentUser={currentUser}/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductCard;
