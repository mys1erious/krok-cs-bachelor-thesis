import {Brand, Category, Product, User} from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};


export type SafeBrand = Omit<
    Brand,
    "createdAt" | "updatedAt"
> & {
    createdAt: string;
    updatedAt: string;
};


export type SafeCategory = Omit<
    Category,
    "createdAt" | "updatedAt"
> & {
    createdAt: string;
    updatedAt: string;
};


export type SafeProduct = Omit<
    Product,
    "createdAt" | "updatedAt"
> & {
    createdAt: string;
    updatedAt: string;
};
