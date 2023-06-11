import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        name,
        description,
        brandId,
        categoryId,
        specs,
        imageSrc,
        price
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const object = await prisma.product.create({
        data: {
            name,
            description,
            brand: {connect: {id: brandId}},
            category: {connect: {id: categoryId}},
            specs,
            imageSrc,
            price: parseInt(price, 10),
            viewCounter: 0,
        }
    });

    return NextResponse.json(object);
}
