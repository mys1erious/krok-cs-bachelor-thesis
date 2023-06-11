import {unslugify} from "@/app/utils";
import React from "react";

type DetailListItemProps = {
    name: string,
    val: string,
}


const DetailListItem = ({name, val}: DetailListItemProps) => {
    return (
        <li key={name}>
            <span className="font-bold">{unslugify(name)}: </span>
            <span>{val}</span>
        </li>
    )
};


export default DetailListItem;
