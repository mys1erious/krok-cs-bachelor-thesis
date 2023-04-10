import React from "react";
import {Nunito} from "next/font/google";
import './globals.css';

import Navbar from "@/app/components/core/Navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";


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
            {/* Add 'use client' components in here, not sure its still needed? */}
            {/*<ClientOnly>*/}
            {/*    <Navbar />*/}
            {/*</ClientOnly>*/}
            <Navbar />
            {children}
        </body>
        </html>
    );
};
