import React from "react";
import AddObjectsContainer from "@/app/components/admin/AddObjectsContainer";
import ClientOnly from "@/app/components/core/ClientOnly";
import Container from "@/app/components/core/Container";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Erorr403 from "@/app/components/core/403";
import {Roles} from "@/app/constants/constants";


export default async function AdminPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== Roles.ADMIN)
        return <Erorr403/>;

    return (
        <ClientOnly>
            <Container>
                <div className="flex">
                    <div className="min-w-[140px] w-2/12 max-w-xs">
                        <AddObjectsContainer/>
                    </div>
                </div>
            </Container>
        </ClientOnly>
    );
};
