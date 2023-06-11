'use client';

import Image from "next/image";


type AvatarProps = {
    src: string | null | undefined;
};


const Avatar = ({src}: AvatarProps) => {
    return (
        <Image className="rounded-full"
               src={src || "/images/avatar-placeholder.jpg"}
               alt="Avatar"
               height="30" width="30"
        />
    );
};


export default Avatar;
