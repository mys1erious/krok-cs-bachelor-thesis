'use client';


import {createContext, useState} from "react";

export const LocaleContext = createContext({});


export const LanguageProvider = ({children}: any) => {
    const [locale, setLocale] = useState({});

    return (
        // @ts-ignore
        <LocaleContext.Provider value={{locale, setLocale}}>
            {children}
        </LocaleContext.Provider>
    );
};
