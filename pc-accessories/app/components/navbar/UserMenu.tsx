'use client';

import React, {useCallback, useState} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import {signOut} from "next-auth/react";

import Avatar from "@/app/components/core/Avatar";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import MenuItem from "@/app/components/navbar/MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import {SafeUser} from "@/app/types";
import useCategoriesModal from "@/app/hooks/useCategoriesModal";


type UserMenuProps = {
    currentUser?: SafeUser | null;
};


const UserMenu = ({currentUser}: UserMenuProps) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const categoriesModal = useCategoriesModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onMyProfile = useCallback(() => {
        if (!currentUser) return loginModal.onOpen();

        // Open My Profile
    }, [currentUser, loginModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text-sm fond-semibold py-3 px-4 rounded-full hover:bg-neutral-100
                                transition cursor-pointer"
                     onClick={onMyProfile}>
                    My Profile
                </div>
                <div className="flex flex-row p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 items-center gap-3
                                rounded-full cursor-pointer hover:shadow-md transition"
                     onClick={toggleOpen}
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0
                                top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <MenuItem label="Categories" onClick={categoriesModal.onOpen}/>
                        <hr/>
                        {currentUser ? (
                            <>
                            <MenuItem label="My favorites" onClick={() => {}}/>
                            <MenuItem label="My Profile" onClick={() => {}}/>
                            <hr/>
                            <MenuItem label="Sign Out" onClick={() => signOut()}/>
                            </>
                        ) : (
                            <>
                            <MenuItem label="Sign In" onClick={loginModal.onOpen}/>
                            <MenuItem label="Sign Up" onClick={registerModal.onOpen}/>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};


export default UserMenu;
