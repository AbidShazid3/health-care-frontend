// components/layout/MobileSheet.tsx
"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


interface NavLink {
    href: string;
    label: string;
}

export const MobileSheet = ({ navigationLinks }: { navigationLinks: NavLink[] }) => {
    const pathname = usePathname();

    return (
        <Sheet key={"mobile-menu"}>
            <SheetTrigger asChild>
                <Button className="md:hidden" variant="ghost">
                    <MenuIcon />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-full h-full">
                <SheetHeader>
                    <SheetTitle>
                        {/* Logo */}
                        <Logo />
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        Use this menu to navigate through the website
                    </SheetDescription>
                </SheetHeader>

                {/* Mobile Navigation */}
                <nav className="flex flex-col items-center justify-center gap-4 text-lg font-medium h-full">
                    {navigationLinks.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <SheetClose asChild key={index}>
                                <Link
                                    href={link.href}
                                    className={`${isActive
                                        ? "text-primary border-b-2 border-primary"
                                        : "text-accent-foreground hover:text-primary"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </SheetClose>
                        );
                    })}
                </nav>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button size="lg" variant={"destructive"}>Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};