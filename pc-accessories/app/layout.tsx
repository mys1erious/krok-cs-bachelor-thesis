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


    return (
        <html>
        <body className={font.className}>
        <LanguageProvider>
        <ClientOnly>
            <ToasterProvider/>
            <RegisterModal/>
            <LoginModal/>
            <CategoriesModal categories={categories}/>
            <Navbar currentUser={currentUser} categories={categories}/>
        </ClientOnly>
        <div className="pb-20 min-h-[90%]">
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
