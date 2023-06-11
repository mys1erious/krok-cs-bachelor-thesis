'use client';


import {useRouter} from "next/navigation";
import Heading from "@/app/components/core/Heading";
import Button from "@/app/components/core/Button";
import {useContext} from "react";
import {LocaleContext} from "@/app/contexts/LocaleContext";


type EmptyStateProps = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
};


const EmptyState = ({
    title='',
    subtitle='',
    showReset
}: EmptyStateProps) => {
    // @ts-ignore
    const { locale } = useContext(LocaleContext);

    if (!title) title = locale.noExactMatches;
    if (!subtitle) subtitle = locale.tryChangeFilters;

    const router = useRouter();
    return (
        <div className="flex flex-col gap-2 justify-center items-center h-[60vh]">
            <Heading title={title} subtitle={subtitle} center/>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button label={locale.removeAllFilters} outline onClick={() => router.push('/')}/>
                )}
            </div>
        </div>
    );
};


export default EmptyState;
