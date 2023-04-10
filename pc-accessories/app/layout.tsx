import React from "react";
import {Nunito} from "next/font/google";
import './globals.css';

import Navbar from "@/app/components/core/Navbar/Navbar";


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
            <Navbar />
            {children}
        </body>
        </html>
    );
};
