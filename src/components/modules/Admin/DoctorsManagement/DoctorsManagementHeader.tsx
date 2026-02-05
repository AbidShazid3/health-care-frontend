"use client";

import { ISpecialty } from "@/types/specialties.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import DoctorFormDialog from "./DoctorFormDialog";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";


interface DoctorsManagementHeaderProps {
    specialties?: ISpecialty[];
}

const DoctorsManagementHeader = ({
    specialties,
}: DoctorsManagementHeaderProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };
    return (
        <>
            <DoctorFormDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={handleSuccess}
                specialties={specialties}
            />

            <ManagementPageHeader
                title="Doctors Management"
                description="Manage Doctors information and details"
                action={{
                    label: "Add Doctor",
                    icon: Plus,
                    onClick: () => setIsDialogOpen(true),
                }}
            />
        </>
    );
};

export default DoctorsManagementHeader;