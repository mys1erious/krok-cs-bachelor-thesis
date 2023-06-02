'use client';

import React from "react";

import Container from "@/app/components/core/Container";
import Logo from "@/app/components/navbar/Logo";
import Search from "@/app/components/navbar/Search";
import UserMenu from "@/app/components/navbar/UserMenu";
import {SafeCategory, SafeUser} from "@/app/types";
import Categories from "@/app/components/navbar/Categories";
import LanguageButton from "@/app/components/navbar/LanguageButton";


type NavbarProps = {
    currentUser?: SafeUser | null;
    categories: SafeCategory[];
};


const Navbar = ({currentUser, categories}: NavbarProps) => {
    return (
        <div className="fixed w-full z-10 text-white rounded-b-xl">
            <div className="py-4 border-b-[1px] border-gray-500 bg-gray-700">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories categories={categories} />
        </div>
    );
};


export default Navbar;
