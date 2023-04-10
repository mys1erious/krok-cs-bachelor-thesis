'use client';

import React, {useCallback, useState} from "react";
import {AiOutlineMenu} from "react-icons/all";

import Avatar from "@/app/components/core/Avatar";
import MenuItem from "@/app/components/core/Navbar/MenuItem";


const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text-sm fond-semibold py-3 px-4 rounded-full hover:bg-neutral-100
                                transition cursor-pointer"
                     onClick={() => {}}>
                    My Profile
                </div>
                <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3
                                rounded-full cursor-pointer hover:shadow-md transition"
                     onClick={toggleOpen}
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0
                                top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <>
                            <MenuItem label="Sign In" onClick={() => {}} />
                            <MenuItem label="Sign Up" onClick={() => {}} />
                        </>
                    </div>
                </div>
            )}
        </div>
    );
};


export default UserMenu;
