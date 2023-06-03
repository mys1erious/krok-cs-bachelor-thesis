import prisma from "@/app/libs/prismadb";


export default async function getBrandById(brandId: string) {
    try {
        const brand = await prisma.brand.findUnique({
            where: {
                id: brandId,
            }
        });

        if (!brand) {
            return null;
        }

        return {
            ...brand,
            createdAt: brand.createdAt.toString(),
            updatedAt: brand.updatedAt.toString(),
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
