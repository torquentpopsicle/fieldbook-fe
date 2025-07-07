import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Star, Users, Clock } from "lucide-react";

interface FieldCardProps {
  id: number;
  name: string;
  address: string;
  images: string;
  price_per_hour: number;
  rating: number;
  reviews_count: number;
  capacity: number;
  sport_type: string;
  availability_summary: string;
  facilities?: string[];
  currency?: string;
  description?: string;
}

const FieldCard = ({
  name,
  address,
  images,
  price_per_hour,
  rating,
  reviews_count,
  capacity,
  sport_type,
  availability_summary,
  facilities = [],
  currency = "Rp",
}: FieldCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={images}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-sport-500 hover:bg-sport-600">
          {sport_type}
        </Badge>
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-xs font-medium">{rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>

        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {address}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            Up to {capacity} players
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {availability_summary}
          </div>
        </div>

        {facilities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {facilities.slice(0, 3).map((facility) => (
              <Badge key={facility} variant="secondary" className="text-xs">
                {facility}
              </Badge>
            ))}
            {facilities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{facilities.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-sport-600">
              {currency} {price_per_hour.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {reviews_count} reviews
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full gradient-bg hover:opacity-90">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FieldCard;
