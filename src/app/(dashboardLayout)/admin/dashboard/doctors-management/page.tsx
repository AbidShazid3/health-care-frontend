import DoctorFilters from "@/components/modules/Admin/DoctorsManagement/DoctorFilters";
import DoctorsManagementHeader from "@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialty } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";


const AdminDoctorsManagementPage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", specialty: "Cardiology" => "?searchTerm=John&specialty=Cardiology"}
    const specialtiesResult = await getSpecialty();
    const doctorsResult = await getDoctors(queryString);
    const totalPages = Math.ceil(
        (doctorsResult?.data?.meta?.total || 1) / (doctorsResult?.data?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <DoctorsManagementHeader specialties={specialtiesResult?.data || []} />

            <DoctorFilters specialties={specialtiesResult?.data || []} />

            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <DoctorsTable doctors={doctorsResult?.data?.data} specialties={specialtiesResult?.data || []} />
                <TablePagination currentPage={doctorsResult?.data?.meta?.page || 1} totalPages={totalPages || 1} />
            </Suspense>
        </div>
    );
};

export default AdminDoctorsManagementPage;