'use client';


import React from "react";


type SelectInputProps = {
    objects: any,
    selectedObject?: any,
    setSelectedObject: any
};


const SelectInput = ({objects, setSelectedObject}: SelectInputProps) => {
    return(
        <select onChange={(e) => setSelectedObject(e.target.value)}>
            {objects.map((obj: any) => (
                <option key={obj.id} value={obj.id}>
                    {obj.name}
                </option>
            ))}
        </select>
    );
};


export default SelectInput;
