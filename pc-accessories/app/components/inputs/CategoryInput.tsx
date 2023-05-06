'use client';


import {IconType} from "react-icons";


type CategoryInputProps = {
    icon: IconType,
    label: string,
    description?: string,
    selected?: boolean,
    onClick: (value: string) => void;
};



const CategoryInput = ({icon: Icon, label, description, selected, onClick}: CategoryInputProps) => {
    return (
        <div className={`flex flex-col rounded-xl border-2 p-4 gap-3 hover:border-black transition cursor-pointer
                         ${selected ? 'border-black' : 'border-neutral-200'} `}
             onClick={() => {onClick(label)}}>
            <div className="flex justify-start items-center">
                <Icon size={25} className="mr-2"/>
                <div className="font-semibold">{label}</div>
            </div>
            <div className="flex justify-start items-center">
                <div className="text-neutral-500">{description}</div>
            </div>
        </div>
    );
};


export default CategoryInput;
