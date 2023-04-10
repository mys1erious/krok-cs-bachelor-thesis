'use client';

import React from "react";
import Container from "@/app/components/core/Container";
import Logo from "@/app/components/core/Navbar/Logo";
import Search from "@/app/components/core/Navbar/Search";
import UserMenu from "@/app/components/core/Navbar/UserMenu";

const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu />
                    </div>
                </Container>
            </div>
        </div>
    );
};


export default Navbar;
