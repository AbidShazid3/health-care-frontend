import { Search, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LargeSparkleIcon, SparkleIcon } from "@/assets/icons/SparkleIcon";

export function Hero() {
    return (
        <div className="w-full relative">
            {/* Background Gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(125% 125% at 50% 90%, #fff 30%, #155DFC 100%)",
                }}
            />

            <div className="w-full px-4 py-8 md:px-8 lg:px-16 relative">
                <div className="mx-auto max-w-[1200px] 2xl:max-w-11/12">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* LEFT SIDE */}
                        <div className="flex flex-col justify-center space-y-6 2xl:space-y-10">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-3 self-start rounded-full bg-white px-4 py-2">
                                <SparkleIcon />
                                <span className="text-[12px] font-medium text-blue-700">
                                    AI-Powered Healthcare
                                </span>
                            </div>

                            {/* Heading */}
                            <div className="space-y-2">
                                <h1 className="text-[51px] leading-[60px] font-bold">Find Your Perfect</h1>
                                <h1 className="text-[51px] leading-[60px] font-medium">Doctor with AI</h1>
                            </div>

                            {/* Description */}
                            <div className="space-y-1 text-[17px] leading-7 text-gray-600">
                                <p>Our advanced AI technology analyzes your symptoms, medical</p>
                                <p>history, and preferences to match you with the best-fit doctors</p>
                                <p>in seconds.</p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button className="h-[55px] gap-3 rounded-xl bg-blue-600 px-8 text-[15px] hover:bg-blue-700">
                                    <Search className="size-5" />
                                    Find Your Doctor
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-[55px] gap-3 rounded-xl border-blue-600 px-8 text-[15px] text-blue-600 hover:bg-blue-50"
                                >
                                    <Calendar className="size-5" />
                                    Book Appointment
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="space-y-1">
                                    <p className="text-[25px]">50K+</p>
                                    <p className="text-[14px] text-gray-600">Patients Served</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[25px]">1000+</p>
                                    <p className="text-[14px] text-gray-600">Expert Doctors</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-[25px]">4.9</p>
                                        <Star className="size-6 fill-yellow-400 stroke-yellow-400" />
                                    </div>
                                    <p className="text-[14px] text-gray-600">Patient Rating</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex items-center justify-center lg:justify-end">
                            <div className="w-full 2xl:max-w-2xl rounded-2xl bg-white p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold">AI Doctor Finder</h2>
                                    <LargeSparkleIcon />
                                </div>

                                {/* Form */}
                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className=" text-gray-400">
                                            What are your symptoms?
                                        </Label>
                                        <Input
                                            placeholder="e.g. headache, fever, cough"
                                            className="h-[50px] rounded-xl border-gray-300"
                                        />
                                    </div>

                                    <Button className="h-[55px] w-full rounded-xl bg-blue-600 text-[15px] hover:bg-blue-700">
                                        Get AI Recommendations
                                    </Button>
                                </form>

                                <div className="mt-6 border-t border-gray-200 pt-4">
                                    <p className="text-center text-[12px] text-gray-600">
                                        ✨ Powered by advanced AI algorithms for accurate doctor
                                        matching
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}