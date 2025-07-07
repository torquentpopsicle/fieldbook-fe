import { useState, useEffect } from "react";
import CustomerLayout from "@/components/customer/CustomerLayout";
import FieldCard from "@/components/field-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Filter,
  MapPin,
  Calendar as CalendarIcon,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { apiGet, API_ENDPOINTS } from "@/lib/api";

const BookField = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportType, setSportType] = useState("");
  const [date, setDate] = useState<Date>();
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("recommended");
  const [availableFields, setAvailableFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // Fetch fields data from API
  useEffect(() => {
    const fetchFields = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiGet(API_ENDPOINTS.FIELDS);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAvailableFields(data.data || data || []);
      } catch (err) {
        console.error("Error fetching fields:", err);
        setError("Failed to load fields. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Book a Field</h2>
          <p className="text-muted-foreground">
            Find and reserve the perfect sports facility for your next game
          </p>
        </div>

        {/* Search and Quick Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location Search */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sport Type */}
              <Select value={sportType} onValueChange={setSportType}>
                <SelectTrigger>
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

              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Search Button */}
              <Button className="gradient-bg hover:opacity-90">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <Card className="h-fit">
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

              {/* Facilities */}
              <div>
                <label className="text-sm font-medium mb-4 block">
                  Facilities
                </label>
                <div className="space-y-3">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
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

              {/* Clear Filters */}
              <Button variant="outline" className="w-full">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Available Fields</h3>
                <p className="text-sm text-muted-foreground">
                  {loading
                    ? "Loading..."
                    : `${availableFields.length} fields found`}
                </p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(sportType ||
              date ||
              priceRange[0] > 0 ||
              priceRange[1] < 200) && (
              <div className="flex flex-wrap gap-2">
                {sportType && sportType !== "all" && (
                  <Badge variant="secondary" className="capitalize">
                    {sportType}
                    <button
                      onClick={() => setSportType("")}
                      className="ml-2 hover:text-destructive"
                    >
                      x
                    </button>
                  </Badge>
                )}
                {date && (
                  <Badge variant="secondary">
                    {format(date, "MMM dd")}
                    <button
                      onClick={() => setDate(undefined)}
                      className="ml-2 hover:text-destructive"
                    >
                      x
                    </button>
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <Badge variant="secondary">
                    ${priceRange[0]} - ${priceRange[1]}
                    <button
                      onClick={() => setPriceRange([0, 200])}
                      className="ml-2 hover:text-destructive"
                    >
                      x
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Field Results Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Loading fields...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              </div>
            ) : availableFields.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-muted-foreground">No fields found.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableFields.map((field) => (
                  <FieldCard key={field.id} {...field} />
                ))}
              </div>
            )}

            {/* Load More */}
            {!loading && !error && availableFields.length > 0 && (
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Fields
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default BookField;
