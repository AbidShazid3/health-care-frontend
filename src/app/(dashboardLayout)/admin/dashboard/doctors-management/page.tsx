import DoctorsManagementHeader from "@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialty } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialties.interface";
import { Suspense } from "react";


const AdminDoctorsManagementPage = async({searchParams}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", specialty: "Cardiology" => "?searchTerm=John&specialty=Cardiology"}
    const specialtiesResult = await getSpecialty();
    const doctorsResult = await getDoctors(queryString);
    const totalPages = Math.ceil(doctorsResult.data.meta.total / doctorsResult.data.meta.limit)

    return (
        <div className="space-y-6">
            <DoctorsManagementHeader specialties={specialtiesResult.data}/>
            <div className="flex gap-2">
                <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
                <SelectFilter
                    paramName="specialty"
                    options={specialtiesResult.data.map((specialty: ISpecialty) => ({
                        label: specialty.title,
                        value: specialty.id
                    }))}
                    placeholder="Filter By Specialty"
                />
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <DoctorsTable doctors={doctorsResult?.data?.data} specialties={specialtiesResult.data} />
                <TablePagination currentPage={doctorsResult.data.meta.page} totalPages={totalPages}/>
            </Suspense>
        </div>
    );
};

export default AdminDoctorsManagementPage;