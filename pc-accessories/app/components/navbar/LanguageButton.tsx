'use client';


import React, {useContext, useEffect, useState} from 'react';
import { LocaleContext } from '@/app/contexts/LocaleContext';
import enData from '@/locale/en.json';
import uaData from '@/locale/ua.json';
import Button from "@/app/components/core/Button";

const LanguageButton = () => {
    // @ts-ignore
    const { setLocale } = useContext(LocaleContext);
    const [languageType, setLanguageType] = useState('en');

    useEffect(() => {
        setLocale(languageType === 'en' ? enData : uaData);
    }, []);

    // @ts-ignore
    const changeLanguage = () => {
        const nextLang = languageType === 'en' ? 'ua' : 'en';
        setLanguageType(nextLang);
        setLocale(nextLang === 'en' ? enData : uaData);
    };

    return (
        <div>
            <button onClick={changeLanguage}>{languageType}</button>
        </div>
    );
};

export default LanguageButton;
