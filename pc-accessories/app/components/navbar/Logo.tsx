'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";


const Logo = () => {
    const router = useRouter();

    return (
        <Image className="hidden md:block cursor-pointer" // Reverse hidden/block
               src="/images/logo_white.png" alt="Logo"
               height="31" width="31"
               onClick={() => router.push('/')}
        />
    );
};


export default Logo;
