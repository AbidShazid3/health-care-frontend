"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "#", label: "Consultation" },
    { href: "#", label: "Health Plans" },
    { href: "#", label: "Medicine" },
    { href: "#", label: "Diagnostics" },
    { href: "#", label: "NGOs" },
];

const PublicNavbar = () => {
    const pathname = usePathname();

    return (
        <header className="sticky w-full top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b px-4 md:px-6">
            <div className="flex h-16 items-center justify-between gap-4 ">
                {/* Left Side: Logo + Mobile Menu */}
                <div className="flex items-center gap-2">
                    {/* Mobile Menu */}
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
                                    const isActive = pathname === link.href
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
                                    )
                                    return null
                                })}
                            </nav>

                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button size="lg" variant={"destructive"}>Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Logo />
                </div>

                {/* Right Side: Desktop Navigation + Auth */}
                <div className="flex items-center gap-4">
                    {/* Desktop Navigation */}
                    <NavigationMenu key="desktop-nav" className="hidden md:flex">
                        <NavigationMenuList className="md:gap-4 lg:gap-7 2xl:gap-10">
                            {navigationLinks.map((link, index) => {
                                const isActive = pathname === link.href
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

                                )
                                return null
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>



                    <div className="flex items-center gap-4">
                        <Button asChild variant="destructive" size="sm">
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default PublicNavbar;