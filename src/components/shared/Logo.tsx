import { Stethoscope } from "lucide-react";
import Link from "next/link";


const Logo = () => {
    return (
        <Link href={"/"} className="flex items-center space-x-2">
            <Stethoscope className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-primary">Health Care</span>
        </Link>
    );
};

export default Logo;