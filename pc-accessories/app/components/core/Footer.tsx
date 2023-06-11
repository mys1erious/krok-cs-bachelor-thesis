'use client';


import React, {useContext} from 'react';
import {LocaleContext} from "@/app/contexts/LocaleContext";


const Footer = () => {
    // @ts-ignore
    const { locale } = useContext(LocaleContext);

    return (
        <footer className="bg-gray-700 pt-2 pb-4 px-5">
            <div className="text-center text-sm text-white border-t border-gray-500 mt-6 pt-6">
                <p>{locale.footerCopyright}</p>
                <p>{locale.footerInfo}</p>
            </div>
        </footer>
    );
};


export default Footer;
