'use client';

import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {BiSearch} from "react-icons/bi";

import useCategoriesModal from "@/app/hooks/useCategoriesModal";
import {LocaleContext} from "@/app/contexts/LocaleContext";
import {useRouter, useSearchParams} from "next/navigation";
import qs from "query-string";


const Search = () => {
    // @ts-ignore
    const { locale } = useContext(LocaleContext);
    const router = useRouter();
    const params = useSearchParams();

    const categoriesModal = useCategoriesModal();

    const [showInput, setShowInput] = useState(false);
    const [inputText, setInputText] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (showInput) {
            const handleClickOutside = (event: MouseEvent) => {
                if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                    setShowInput(false);
                }
            };
            document.addEventListener("click", handleClickOutside as EventListener);
            return () => {
                document.removeEventListener("click", handleClickOutside as EventListener);
            };
        }
    }, [showInput]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            handleSubmit();
        }
    };

    const handleSubmit = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            text: inputText
        }

        if (!inputText) delete updatedQuery.text;

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        router.push(url);
    }, [router, params, inputText]);

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
                         onClick={() => setShowInput(cur => !cur)}>
                        <BiSearch size={18}/>
                    </div>
                </div>
                {showInput ? (
                    <input className="transition-all duration-500 w-full max-w-full opacity-100 py-2 pl-3 mr-6 text-black
                                      rounded-full shadow-sm hover:shadow-md"
                        ref={inputRef} type="text" placeholder={locale.search + '...'} value={inputText}
                        onChange={handleInputChange} onKeyDown={handleKeyPress} />
                ) : (
                    <input className="transition-all duration-500 max-w-0 opacity-0 pl-3" type="text" disabled/>
                )}
            </div>
        </div>
    );
};


export default Search;
