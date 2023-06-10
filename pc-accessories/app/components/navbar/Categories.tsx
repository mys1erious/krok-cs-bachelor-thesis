'use client';


import React from "react";
import Container from "@/app/components/core/Container";
import {usePathname, useSearchParams} from "next/navigation";
import {SafeCategory} from "@/app/types";
import CategoryBox from "@/app/components/products/CategoryBox";
import {CategoryIcons} from "@/app/constants/constants";


type CategoriesProps = {
    categories: SafeCategory[]
};


const Categories = ({categories}: CategoriesProps) => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) return null;

    return (
        <div className="bg-white rounded-b-xl h-16 min-w-[300px] w-1/2 m-auto shadow-md">
        <Container>
            <div className="flex flex-row items-center justify-between overflow-x-auto px-8">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.id}
                        id={item.id}
                        label={item.name}
                        // @ts-ignore
                        icon={CategoryIcons[item.name]}
                        selected={category === item.name}
                    />
                ))}
            </div>
        </Container>
        </div>
    );
}

export default Categories;
