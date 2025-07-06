import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FieldCard from "@/components/field-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, MapPin, SlidersHorizontal } from "lucide-react";

const BrowseFields = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportType, setSportType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("recommended");

  // Mock data for fields
  const allFields = [
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
    {
      id: "5",
      name: "Futsal Pro Arena",
      location: "North Sports Complex",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
      price: 65,
      rating: 4.5,
      reviews: 78,
      capacity: 12,
      sportType: "Futsal",
      availability: "Available today",
      features: ["Indoor", "Professional Surface", "Sound System", "Lighting"],
    },
    {
      id: "6",
      name: "Badminton Excellence",
      location: "East Community Center",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0a9ba4b7d8b?w=400&h=300&fit=crop",
      price: 35,
      rating: 4.4,
      reviews: 92,
      capacity: 4,
      sportType: "Badminton",
      availability: "Available now",
      features: [
        "Indoor",
        "Multiple Courts",
        "Equipment Rental",
        "Air Conditioning",
      ],
    },
  ];

  const sportTypes = [
    "Soccer",
    "Basketball",
    "Tennis",
    "Volleyball",
    "Futsal",
    "Badminton",
  ];
  const features = [
    "Indoor",
    "Outdoor",
    "Parking",
    "Changing Rooms",
    "Equipment Rental",
    "Floodlights",
    "Air Conditioning",
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Browse Sports Fields
            </h1>
            <p className="text-muted-foreground text-lg">
              Find the perfect venue for your next game
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location, venue name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sport Type Filter */}
              <Select value={sportType} onValueChange={setSportType}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="All Sports" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  {sportTypes.map((sport) => (
                    <SelectItem key={sport} value={sport.toLowerCase()}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {sportType && (
                <Badge variant="secondary" className="capitalize">
                  {sportType}
                  <button
                    onClick={() => setSportType("")}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {priceRange[0] > 0 || priceRange[1] < 200 ? (
                <Badge variant="secondary">
                  ${priceRange[0]} - ${priceRange[1]}
                  <button
                    onClick={() => setPriceRange([0, 200])}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Price Range (per hour)
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      step={5}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Features
                    </label>
                    <div className="space-y-3">
                      {features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={feature} />
                          <label htmlFor={feature} className="text-sm">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Availability
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available-now" />
                        <label htmlFor="available-now" className="text-sm">
                          Available Now
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available-today" />
                        <label htmlFor="available-today" className="text-sm">
                          Available Today
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available-weekend" />
                        <label htmlFor="available-weekend" className="text-sm">
                          Available This Weekend
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {allFields.length} results
                </p>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allFields.map((field) => (
                  <FieldCard key={field.id} {...field} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Fields
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrowseFields;
