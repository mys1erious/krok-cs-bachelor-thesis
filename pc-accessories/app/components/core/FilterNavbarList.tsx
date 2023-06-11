'use client';


import CheckboxInput from "@/app/components/inputs/CheckboxInput";
import qs from "query-string";
import React from "react";
import {useSearchParams} from "next/navigation";


type FilterNavbarListProps = {
    label: string,
    items: any,
    idField: string,
    nameField:string,
    onChange: any,
    queryParam: string
};


const FilterNavbarList = ({label, items, idField, nameField, onChange, queryParam}: FilterNavbarListProps) => {
    const params = useSearchParams();

    const shouldAddScrollbar = items.length > 8;

    return (
        <div className={`py-2 border-b border-gray-300 ${shouldAddScrollbar ? 'max-h-64 overflow-y-auto' : ''}`}>
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
            <ul className="space-y-2">
                {items.map((item: any) => (
                    <CheckboxInput key={item[idField]} label={item[nameField]}
                        // @ts-ignore
                        checked={qs.parse(params.toString())[queryParam] === item[nameField]}
                        onChange={(e: any) => {onChange(e, item)}}
                    />
                ))}
            </ul>
        </div>
    )
}


export default FilterNavbarList;
