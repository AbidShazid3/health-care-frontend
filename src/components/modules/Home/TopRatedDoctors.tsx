import { Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import cardioDoc from "../../../assets/images/doctor-cardiologist.jpg";
import neurolDoc from "../../../assets/images/doctor-neurologist.jpg";
import orthoDoc from "../../../assets/images/doctor-orthopedic.jpg";
import pediatricDoc from "../../../assets/images/doctor-orthopedic.jpg";

const doctors = [
  {
    name: "Dr. Cameron Williamson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 23,
    image: cardioDoc,
  },
  {
    name: "Dr. Leslie Alexander",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 45,
    image: neurolDoc,
  },
  {
    name: "Dr. Robert Fox",
    specialty: "Orthopedic",
    rating: 4.9,
    reviews: 32,
    image: orthoDoc,
  },
  {
    name: "Dr. Albot Fox",
    specialty: "Pediatric",
    rating: 4.9,
    reviews: 32,
    image: pediatricDoc,
  },
];

const DoctorCard = ({ doctor }: { doctor: typeof doctors[0] }) => {
  return (
    <Card className="
        group relative overflow-hidden rounded-2xl border 
        bg-white/80 backdrop-blur-xl shadow-md 
        transition-all duration-300 hover:shadow-2xl
        hover:-translate-y-2
      "
    >
      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <CardHeader className="flex flex-col justify-center items-center pt-8">
        <div className="relative">
          {/* Floating Image on Hover */}
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={96}
            height={96}
            className="
              rounded-full border-4 border-white shadow-lg 
              transform transition-transform duration-300 
              group-hover:scale-110 group-hover:-translate-y-1
            "
          />

          {/* Rating Badge */}
          <div className="
              absolute -bottom-2 right-0 bg-white shadow-sm 
              px-2 py-1 rounded-full flex items-center gap-1 
              text-xs font-semibold
            "
          >
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {doctor.rating}
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-center px-6 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {doctor.name}
        </CardTitle>

        <p className="text-primary/90 font-medium mt-1">{doctor.specialty}</p>

        <p className="mt-2 text-sm text-muted-foreground">
          ⭐ {doctor.rating} ({doctor.reviews} reviews)
        </p>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3 px-6 pb-6">
        <Button
          variant="outline"
          className="rounded-lg border-primary/30 hover:bg-primary/5"
        >
          View Profile
        </Button>
        <Button className="rounded-lg bg-blue-600 hover:bg-blue-700">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

const TopRatedDoctors = () => {
  return (
    <section className="bg-linear-to-b from-blue-50/60 to-white py-24">
      <div className="px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our Top Rated Doctors
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Access highly skilled specialists ready to deliver world-class medical care.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-14">
          <Button
            size="lg"
            className="rounded-xl bg-blue-600 px-8 text-lg hover:bg-blue-700 shadow-md"
          >
            View All Doctors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;