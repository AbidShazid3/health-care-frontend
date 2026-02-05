"use client"

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { IDoctor } from "@/types/doctor.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { doctorsColumns } from "./doctorsColumns";
import { softDeleteDoctor } from "@/services/admin/doctorManagement";
import { toast } from "sonner";
import DoctorViewDetailDialog from "./DoctorViewDetailDialog";
import DoctorFormDialog from "./DoctorFormDialog";
import { ISpecialty } from "@/types/specialties.interface";

interface DoctorsTableProps {
    doctors: IDoctor[],
    specialties: ISpecialty[],
}

const DoctorsTable = ({ doctors, specialties }: DoctorsTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition()
    const [deletingDoctor, setDeletingDoctor] =
        useState<IDoctor | null>(null);
    const [viewingDoctor, setViewingDoctor] = useState<IDoctor | null>(null);
    const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null)
    const [isDeletingDialog, setIsDeletingDialog] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        })
    }

    const handleView = (doctor: IDoctor) => {
        setViewingDoctor(doctor);
    };

    const handleEdit = (doctor: IDoctor) => {
        setEditingDoctor(doctor);
    }

    const handleDelete = (doctor: IDoctor) => {
        setDeletingDoctor(doctor);
    }

    const confirmDelete = async () => {
        if (!deletingDoctor) return;

        setIsDeletingDialog(true);
        const result = await softDeleteDoctor(deletingDoctor.id!);
        setIsDeletingDialog(false);

        if (result.success) {
            toast.success(result.message || "Doctor deleted successfully");
            setDeletingDoctor(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete doctor");
        }
    }
    return (
        <>
            <ManagementTable
                data={doctors}
                columns={doctorsColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(doctor) => doctor.id!}
                emptyMessage="No doctors found"
            />

            {/* View Doctor Detail Dialog */}
            <DoctorViewDetailDialog
                open={!!viewingDoctor}
                onClose={() => setViewingDoctor(null)}
                doctor={viewingDoctor}
            />

            {/* Edit doctor form dialog */}
            <DoctorFormDialog
                open={!!editingDoctor}
                onClose={() => setEditingDoctor(null)}
                doctor={editingDoctor!}
                specialties={specialties}
                onSuccess={() => {
                    setEditingDoctor(null)
                    handleRefresh();
                }}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingDoctor}
                onOpenChange={(open) => !open && setDeletingDoctor(null)}
                onConfirm={confirmDelete}
                title="Delete Doctor"
                description={`Are you sure you want to delete ${deletingDoctor?.name}? This action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </>
    );
};

export default DoctorsTable;