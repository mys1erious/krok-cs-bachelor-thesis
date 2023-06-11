import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

type IParams = {
    productId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { productId } = params;

    if (!productId) {
        throw new Error('Invalid ID');
    }

    const product = await prisma.product.deleteMany({
        where: {
            id: productId
        }
    });

    return NextResponse.json(product);
}
