import { Button } from "@/components/ui/button";
import FieldCard from "./field-card";
import { ChevronRight } from "lucide-react";

const FeaturedFields = () => {
  const featuredFields = [
    {
      id: "1",
      name: "Elite Soccer Complex",
      location: "Downtown Sports Center",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      price: 75,
      rating: 4.8,
      reviews: 124,
      capacity: 22,
      sportType: "Soccer",
      availability: "Available today",
      features: [
        "Floodlights",
        "Parking",
        "Changing Rooms",
        "Equipment Rental",
      ],
    },
    {
      id: "2",
      name: "Premium Basketball Court",
      location: "City Sports Hub",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
      price: 45,
      rating: 4.9,
      reviews: 89,
      capacity: 10,
      sportType: "Basketball",
      availability: "Available now",
      features: ["Indoor", "Air Conditioning", "Sound System", "Scoreboard"],
    },
    {
      id: "3",
      name: "Tennis Club Professional",
      location: "Riverside Tennis Center",
      image:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
      price: 60,
      rating: 4.7,
      reviews: 156,
      capacity: 4,
      sportType: "Tennis",
      availability: "Available tomorrow",
      features: [
        "Clay Court",
        "Professional Lighting",
        "Pro Shop",
        "Coaching Available",
      ],
    },
    {
      id: "4",
      name: "Multi-Sport Arena",
      location: "Westside Recreation",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      price: 55,
      rating: 4.6,
      reviews: 203,
      capacity: 20,
      sportType: "Volleyball",
      availability: "Available today",
      features: ["Indoor", "Multiple Courts", "Parking", "Cafe"],
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
