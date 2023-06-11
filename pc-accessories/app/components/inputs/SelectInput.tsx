'use client';


import React from "react";


type SelectInputProps = {
    objects: any,
    selectedObject?: any,
    setSelectedObject: any
};


const SelectInput = ({objects, setSelectedObject}: SelectInputProps) => {
    return (
        <select className="w-full p-4 font-light bg-white border-2 rounded-md outline-none transition border-neutral-300
                           focus:border-black" onChange={(e) => setSelectedObject(e.target.value)}>
            {objects.map((obj: any) => (
                <option key={obj.id} value={obj.id}>
                    {obj.name}
                </option>
            ))}
        </select>
    );
};


export default SelectInput;
