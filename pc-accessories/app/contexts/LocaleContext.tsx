'use client';


import React, {createContext, useState} from "react";


interface LocaleContextType {
    locale: object;
    setLocale: React.Dispatch<React.SetStateAction<object>>;
}


export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);


export const LanguageProvider = ({children}: any) => {
    const [locale, setLocale] = useState<object>({});

    return (
        <LocaleContext.Provider value={{locale, setLocale}}>
            {children}
        </LocaleContext.Provider>
    );
};
