import React from "react";


type CheckboxInputProps = {
    label: string,
    checked: boolean,
    onChange: any
}


const CheckboxInput = ({label, checked, onChange}: CheckboxInputProps) => {
    return (
        <li>
            <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 border-gray-300 rounded"
                       checked={checked} onChange={onChange}
                />
                <span className="ml-2 text-sm">{label}</span>
            </label>
        </li>
    );
};


export default CheckboxInput;
