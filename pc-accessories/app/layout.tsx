import React from "react";
import {Nunito} from "next/font/google";
import './globals.css';

import Navbar from "@/app/components/navbar/Navbar";
import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import CategoriesModal from "@/app/components/modals/CategoriesModal";


export const metadata = {
    title: 'PC Accessories',
    description: 'PC parts picker website',
};

const font = Nunito({
    subsets: ['latin'],
});

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
        <body className={font.className}>
            <ToasterProvider/>
            <RegisterModal/>
            <LoginModal/>
            <CategoriesModal/>
            <Navbar currentUser={currentUser}/>
            <div className="pb-20">
                {children}
            </div>
        </body>
        </html>
    );
};
