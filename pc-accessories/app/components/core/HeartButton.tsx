'use client';


import React from "react";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

import {SafeUser} from "@/app/types";


type HeartButtonProps = {
    productId: string;
    currentUser?: SafeUser | null;
};


const HeartButton = ({productId, currentUser}: HeartButtonProps) => {
    const hasFavorited = false;
    const toggleFavorite = () => {};

    return (
        <div className="relative hover:opacity-80 transition cursor-pointer"
             onClick={toggleFavorite}>
            <AiOutlineHeart className="fill-gray absolute -top[2px] -right-[2px]" size={28}/>
            <AiFillHeart className={hasFavorited ? 'fill-red-600' : 'fill-white'} size={26}/>
        </div>
    );
};


export default HeartButton;
