import prisma from "@/app/libs/prismadb";


export default async function getBrands() {
    try {
        const brands = await prisma.brand.findMany({
            orderBy: {createdAt: 'asc'}
        });

        return brands.map((brand) => ({
            ...brand,
            createdAt: brand.createdAt.toISOString(),
            updatedAt: brand.updatedAt.toISOString(),
        }));
    } catch (error: any) {
        throw new Error(error);
    }
};
