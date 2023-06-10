import React from "react";
import {Nunito} from "next/font/google";
import './globals.css';

import Navbar from "@/app/components/navbar/Navbar";
import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import CategoriesModal from "@/app/components/modals/CategoriesModal";
import ClientOnly from "@/app/components/core/ClientOnly";
import Footer from "@/app/components/core/Footer";
import getCategories from "@/app/actions/getCategories";
import {LanguageProvider} from "@/app/contexts/LocaleContext";
import getBrands from "@/app/actions/getBrands";
import FilterNavbar from "@/app/components/core/FilterNavbar";


export const metadata = {
    title: 'PC Accessories',
    description: 'PC parts picker website',
};

const font = Nunito({
    subsets: ['latin'],
});


export default async function RootLayout({children}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
    const categories = await getCategories();
    const brands = await getBrands();

    return (
        <html>
        <body className={font.className}>
        <LanguageProvider>
        <ClientOnly>
            <FilterNavbar categories={categories} brands={brands}/>
            <ToasterProvider/>
            <RegisterModal/>
            <LoginModal/>
            <CategoriesModal categories={categories}/>
            <Navbar currentUser={currentUser} categories={categories}/>
        </ClientOnly>
        <div className="pb-20 min-h-[88%]">
            {children}
        </div>
        <ClientOnly>
            <Footer/>
        </ClientOnly>
        </LanguageProvider>
        </body>
        </html>
    );
};
