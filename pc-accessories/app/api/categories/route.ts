import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const body = await request.json();
    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const object = await prisma.category.create({
        data: {
            name: body.name,
            description: body.description,
            specsTemplate: body.specsTemplate
        }
    });

    return NextResponse.json(object);
}
