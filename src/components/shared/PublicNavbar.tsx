
import Logo from "./Logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { MobileSheet } from "./PublicNavItems/MobileSheet";
import { DesktopNavigation } from "./PublicNavItems/DesktopNavigation";
import { getCookie } from "@/services/auth/tokenHandlers";
import LogoutButton from "./LogoutButton";

// Static data can live here or be imported
const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "#", label: "Consultation" },
    { href: "#", label: "Health Plans" },
    { href: "#", label: "Medicine" },
    { href: "#", label: "Diagnostics" },
    { href: "#", label: "NGOs" },
];

const PublicNavbar = async () => {
    const accessToken = await getCookie("accessToken");
    return (
        <header className="sticky w-full top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b px-4 md:px-6">
            <div className="flex h-16 items-center justify-between gap-4">
                {/* Left Side: Logo + Mobile Menu (Client Leaf) */}
                <div className="flex items-center gap-2">
                    {/* MobileSheet is a client component */}
                    <MobileSheet navigationLinks={navigationLinks} />

                    {/* Logo */}
                    <Logo />
                </div>

                {/* Right Side: Desktop Navigation (Client Leaf) + Auth */}
                <div className="flex items-center gap-4">
                    {/* DesktopNavigation is a client component */}
                    <DesktopNavigation navigationLinks={navigationLinks} />

                    <div className="flex items-center gap-4">
                        {accessToken ?
                            (<LogoutButton />) : (<Button asChild variant="destructive" size="sm">
                            <Link href="/login">Login</Link>
                        </Button>)}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PublicNavbar;