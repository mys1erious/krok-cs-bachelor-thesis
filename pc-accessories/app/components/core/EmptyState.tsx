'use client';


import {useRouter} from "next/navigation";
import Heading from "@/app/components/core/Heading";
import Button from "@/app/components/core/Button";


type EmptyStateProps = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
};


const EmptyState = ({
    title='No exact matches',
    subtitle='Try to change your filters',
    showReset
}: EmptyStateProps) => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-2 justify-center items-center h-[60vh]">
            <Heading title={title} subtitle={subtitle} center/>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button label="Remove all filters" outline onClick={() => router.push('/')}/>
                )}
            </div>
        </div>
    );
};


export default EmptyState;
