import { Column } from "@/components/shared/ManagementTable";
import { ISpecialty } from "@/types/specialties.interface";
import Image from "next/image";

export const SpecialtiesColumns: Column<ISpecialty>[] = [
    {
        header: "Icon",
        accessor: (specialties) => (
            <Image
                src={specialties.icon}
                alt={specialties.title}
                width={40}
                height={40}
                className="rounded-full"
            ></Image>
        )
    },
    {
        header: "Title",
        accessor: (specialties) => specialties.title
    }
]