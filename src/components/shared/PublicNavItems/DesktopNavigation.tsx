// components/layout/DesktopNavigation.tsx
"use client";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface NavLink {
    href: string;
    label: string;
}

export const DesktopNavigation = ({ navigationLinks }: { navigationLinks: NavLink[] }) => {
    const pathname = usePathname();

    return (
        <NavigationMenu key="desktop-nav" className="hidden md:flex">
            <NavigationMenuList className="md:gap-4 lg:gap-7 2xl:gap-10">
                {navigationLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                        <NavigationMenuItem key={index}>
                            <Link
                                href={link.href}
                                className={`py-1.5 transition-colors ${isActive
                                    ? "text-primary font-medium border-b-2 border-primary"
                                    : "text-accent-foreground hover:text-primary"
                                    } focus:outline-none`}
                            >
                                {link.label}
                            </Link>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};