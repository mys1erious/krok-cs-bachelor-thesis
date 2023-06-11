'use client';

import {BiSearch} from "react-icons/bi";
import React, {ChangeEvent, useContext, useState} from "react";
import {LocaleContext} from "@/app/contexts/LocaleContext";


type MinMaxValueInputProps = {
    onClick: any;
    minValue: number;
    setMinValue: React.Dispatch<React.SetStateAction<number>>;
    maxValue: number;
    setMaxValue: React.Dispatch<React.SetStateAction<number>>;
    label?: string;
}


const MinMaxValueInput = ({onClick, minValue, setMinValue, maxValue, setMaxValue, label}: MinMaxValueInputProps) => {
    // @ts-ignore
    const { locale } = useContext(LocaleContext);

    const handleMinValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setMinValue(e.target.value);
    };

    const handleMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setMaxValue(e.target.value);
    };

    return (
        <div className="mt-2">
            <span className="text-lg font-semibold">{label && (label)}</span>
            <div className="flex space-x-2 justify-center text-xs text-black mt-1">
                <input type="number" className="border border-gray-300 rounded-md px-2 py-1 w-20"
                       placeholder={locale.min}
                       value={minValue} onChange={handleMinValueChange}
                />
                <input type="number" className="border border-gray-300 rounded-md px-2 py-1 w-20"
                       placeholder={locale.max}
                       value={maxValue} onChange={handleMaxValueChange}
                />
                <div className="p-2 bg-red-600 rounded-full text-white cursor-pointer" onClick={onClick}>
                    <BiSearch size={16}/>
                </div>
            </div>
        </div>
    );
};


export default MinMaxValueInput;
