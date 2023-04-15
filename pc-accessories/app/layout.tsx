import React from "react";
import {Nunito} from "next/font/google";
import './globals.css';

import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";


export const metadata = {
    title: 'PC Accessories',
    description: 'PC parts picker website',
};

const font = Nunito({
    subsets: ['latin'],
});

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={font.className}>
            <ToasterProvider/>
            <RegisterModal/>
            <Navbar/>
            {children}
        </body>
        </html>
    );
};
