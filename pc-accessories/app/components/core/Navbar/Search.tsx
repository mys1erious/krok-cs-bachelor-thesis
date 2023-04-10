'use client';

import React from "react";
import {BiSearch} from "react-icons/all";


const Search = () => {
    return (
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition
                        cursor-pointer">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block px-2 border-r-[1px]">Categories</div>
                    <div className="p-2 bg-red-600 rounded-full text-white">
                        <BiSearch size={18}/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Search;