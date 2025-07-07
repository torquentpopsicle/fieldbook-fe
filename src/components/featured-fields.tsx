import { Button } from "@/components/ui/button";
import FieldCard from "./field-card";
import { ChevronRight } from "lucide-react";

const FeaturedFields = () => {
  const featuredFields = [
    {
      id: 1,
      name: "Elite Soccer Complex",
      address: "Downtown Sports Center",
      images:
        "https://plus.unsplash.com/premium_photo-1684446464405-71867f88356b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price_per_hour: 75000,
      rating: 4.8,
      reviews_count: 124,
      capacity: 22,
      sport_type: "Soccer",
      availability_summary: "Available today",
      facilities: [
        "Floodlights",
        "Parking",
        "Changing Rooms",
        "Equipment Rental",
      ],
      currency: "Rp",
    },
    {
      id: 2,
      name: "Premium Basketball Court",
      address: "City Sports Hub",
      images:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
      price_per_hour: 45000,
      rating: 4.9,
      reviews_count: 89,
      capacity: 10,
      sport_type: "Basketball",
      availability_summary: "Available now",
      facilities: ["Indoor", "Air Conditioning", "Sound System", "Scoreboard"],
      currency: "Rp",
    },
    {
      id: 3,
      name: "Tennis Club Professional",
      address: "Riverside Tennis Center",
      images:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
      price_per_hour: 60000,
      rating: 4.7,
      reviews_count: 156,
      capacity: 4,
      sport_type: "Tennis",
      availability_summary: "Available tomorrow",
      facilities: [
        "Clay Court",
        "Professional Lighting",
        "Pro Shop",
        "Coaching Available",
      ],
      currency: "Rp",
    },
    {
      id: 4,
      name: "Multi-Sport Arena",
      address: "Westside Recreation",
      images:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      price_per_hour: 55000,
      rating: 4.6,
      reviews_count: 203,
      capacity: 20,
      sport_type: "Volleyball",
      availability_summary: "Available today",
      facilities: ["Indoor", "Multiple Courts", "Parking", "Cafe"],
      currency: "Rp",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Fields
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover the most popular sports facilities in your area
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center">
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFields.map((field) => (
            <FieldCard key={field.id} {...field} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="md:hidden">
            View All Fields
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFields;
