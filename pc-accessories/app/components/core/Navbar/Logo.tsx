'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";


const Logo = () => {
    const router = useRouter();

    return (
        <Image className="hidden md:block cursor-pointer" // Reverse hidden/block
               src="/images/logo.png" alt="Logo"
               height="31" width="31"
        />
    );
};


export default Logo;
