'use client';


import {useRouter, useSearchParams} from "next/navigation";
import { IconType } from "react-icons";
import {useCallback} from "react";
import qs from 'query-string';


type CategoryBoxProps = {
    icon: IconType,
    label: string;
    id: string;
    selected?: boolean;
};

const CategoryBox = ({icon: Icon, label, selected}: CategoryBoxProps) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [label, router, params]);

    return (
        <div className={`flex flex-col items-center justify-center gap-1 p-3 border-b-2 hover:text-neutral-800
                         transition cursor-pointer ${selected ? 'border-b-neutral-800' : 'border-transparent'}
                         ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
             onClick={handleClick} >
            <Icon size={20} />
            <div className="font-medium text-xs">
                {label}
            </div>
        </div>
    );
}

export default CategoryBox;
