import {unslugify} from "@/app/utils";
import React from "react";
import {SafeBrand, SafeCategory, SafeProduct} from "@/app/types";
import DetailListItem from "@/app/components/products/DetailListItem";


type DetailListProps = {
    product: SafeProduct,
    brand: SafeBrand | null,
    category: SafeCategory | null,
};


const DetailList = ({product, brand, category}: DetailListProps) => {
  return (
      <div className="rounded-xl shadow-md border border-gray-300 min-w-[50%]">
          <ul className="space-y-2 py-4 px-6">
              <DetailListItem name="Description" val={product.description}/>
              <DetailListItem name="Brand" val={brand?.name || ''}/>
              <DetailListItem name="Category" val={category?.name || ''}/>
              {Object.entries(product.specs).map(([key, val]) => (
                  <DetailListItem key={key} name={key} val={val}/>
              ))}
          </ul>
      </div>
  );
};


export default DetailList;
