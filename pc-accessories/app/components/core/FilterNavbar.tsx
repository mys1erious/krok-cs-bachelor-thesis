'use client';


import React, {useCallback, useContext, useRef} from 'react';
import {AiFillFilter} from "react-icons/ai";
import {SafeBrand, SafeCategory} from "@/app/types";
import {LocaleContext} from "@/app/contexts/LocaleContext";
import qs from "query-string";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import useFilterNavbar from "@/app/hooks/useFilterNavbar";
import {IoMdClose} from "react-icons/io";
import FilterNavbarList from "@/app/components/core/FilterNavbarList";


type FilterNavbarProps = {
    categories: SafeCategory[],
    brands: SafeBrand[]
}


const FilterNavbar = ({categories, brands}: FilterNavbarProps) => {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    // @ts-ignore
    const {locale} = useContext(LocaleContext);
    const filterNavbar = useFilterNavbar();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const toggleNavbar = () => {
        if (filterNavbar.isOpen) filterNavbar.onClose();
        else filterNavbar.onOpen();
    };

    const handleBrandOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, brand: SafeBrand) => {
        e.stopPropagation();

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            brand: brand.name
        }

        if (params?.get('brand') === brand.name) {
            delete updatedQuery.brand;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        router.push(url);
    }, [router, params]);

    const handleClose = useCallback(() => {
        filterNavbar.onClose();
    }, [filterNavbar.isOpen]);


    if (!isMainPage) return null;

    return (
        <>
        <div className="fixed left-0 top-24 z-50">
            <button className="flex items-center rounded-r-xl bg-red-600 p-1 pr-2 text-white"
                    onClick={toggleNavbar}>
                {<AiFillFilter size={18}/>}
            </button>
        </div>
        {filterNavbar.isOpen && (
            <>
                <div className="fixed inset-0 z-40 outline-none focus:outline-none bg-neutral-800/60"
                     onClick={handleClose}/>
                <div ref={inputRef} className="fixed left-0 top-0 z-50 bg-gray-700 p-4 w-64 h-screen
                                               border-r border-gray-600 text-white">
                    <h2 className="text-xl font-bold pb-2 border-b border-gray-300">
                        {locale.filters}
                        <button className="p-1 border-0 hover:opacity-70 transition absolute right-9"
                                onClick={handleClose}>
                            <IoMdClose size={18}/>
                        </button>
                    </h2>
                    <FilterNavbarList label={locale.brands} items={brands} idField="id" nameField="name"
                                      onChange={handleBrandOnChange} queryParam="brand"/>

                </div>
            </>
        )}
        </>
    );
};

export default FilterNavbar;
