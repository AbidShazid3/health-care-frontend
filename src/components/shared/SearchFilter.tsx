"use client"

import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFilterProps {
    placeholder?: string;
    paramName?: string
}

const SearchFilter = ({
    placeholder = "Search...", paramName = "searchTerm"
}: SearchFilterProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get(paramName) || "");
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        const initialValue = searchParams.get(paramName) || "";

        if (debouncedValue === initialValue) {
            return;
        }

        if (debouncedValue) {
            params.set(paramName, debouncedValue); // ?searchTerm=debouncedValue
            params.set("page", "1"); // reset to first page on search
        } else {
            params.delete(paramName); // remove searchTerm param
            params.delete("page"); // reset to first page on search clear
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    }, [debouncedValue, paramName, router, searchParams]);

    // Clear button handler
    const handleClear = () => {
        setValue("");
    };


    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder={placeholder}
                className="pl-10"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isPending}
            />
            {value && (
                <button
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-full bg-red-100 hover:bg-red-200 text-red-700 cursor-pointer"
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default SearchFilter;