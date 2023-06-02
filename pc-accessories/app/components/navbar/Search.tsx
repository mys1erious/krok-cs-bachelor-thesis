'use client';

import React, {useContext} from "react";
import {BiSearch} from "react-icons/bi";

import toast from "react-hot-toast";
import useCategoriesModal from "@/app/hooks/useCategoriesModal";
import {LocaleContext} from "@/app/contexts/LocaleContext";


const Search = () => {
    // @ts-ignore
    const { locale } = useContext(LocaleContext);
    const categoriesModal = useCategoriesModal();

    return (
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition
                        cursor-pointer text-white">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row text-sm pl-6 pr-2 items-center gap-3">
                    <div className="hidden sm:block px-2 border-r-[1px]"
                         onClick={categoriesModal.onOpen}>
                        {locale.categories}
                    </div>
                    <div className="p-2 bg-red-600 rounded-full"
                         onClick={() => toast.success('Search BTN')}>
                        <BiSearch size={18}/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Search;
