import { useState } from "react";
import CustomerLayout from "@/components/customer/CustomerLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FieldCard from "@/components/field-card";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Search,
  Plus,
} from "lucide-react";

const CustomerDashboard = () => {
  const upcomingBookings = [
    {
      id: "1",
      field: "Elite Soccer Complex",
      date: "2024-01-15",
      time: "14:00 - 16:00",
      status: "confirmed",
      location: "Downtown Sports Center",
      price: 75,
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      field: "Basketball Court A",
      date: "2024-01-18",
      time: "18:00 - 20:00",
      status: "confirmed",
      location: "City Sports Hub",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      field: "Tennis Court 1",
      date: "2024-01-20",
      time: "09:00 - 10:30",
      status: "pending",
      location: "Riverside Tennis Center",
      price: 60,
      image:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
    },
  ];

  const recommendedFields = [
    {
      id: 1,
      name: "Premium Futsal Arena",
      address: "North Sports Complex",
      images:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
      price_per_hour: 65000,
      rating: 4.8,
      reviews_count: 89,
      capacity: 12,
      sport_type: "Futsal",
      availability_summary: "Available today",
      facilities: [
        "Indoor",
        "Professional Surface",
        "Sound System",
        "Lighting",
      ],
      currency: "Rp",
    },
    {
      id: 2,
      name: "Volleyball Pro Court",
      address: "Westside Recreation",
      images:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      price_per_hour: 55000,
      rating: 4.6,
      reviews_count: 156,
      capacity: 12,
      sport_type: "Volleyball",
      availability_summary: "Available tomorrow",
      facilities: ["Indoor", "Professional Net", "Parking", "Cafe"],
      currency: "Rp",
    },
  ];

  const stats = [
    {
      title: "Total Bookings",
      value: "12",
      change: "+3 this month",
      icon: Calendar,
    },
    {
      title: "Hours Played",
      value: "28",
      change: "+6 this month",
      icon: Clock,
    },
    {
      title: "Favorite Fields",
      value: "5",
      change: "+2 recently",
      icon: Star,
    },
    {
      title: "Total Spent",
      value: "$840",
      change: "+$180 this month",
      icon: TrendingUp,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Ready for your next game? Let's find you the perfect field.
            </p>
          </div>
          <Button className="gradient-bg hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Book New Field
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-sport-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {/* Upcoming Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>
                  Your scheduled field reservations
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <img
                      src={booking.image}
                      alt={booking.field}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-start">
                        <h4 className="font-medium">{booking.field}</h4>
                        <Badge
                          className={`${getStatusColor(booking.status)} ml-3`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {booking.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {booking.time}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-sport-600">
                        ${booking.price}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Find Available Fields
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Reschedule Booking
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Rate Recent Experience
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Invite Friends
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Fields */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>
                Fields based on your preferences and history
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" />
              Browse All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedFields.map((field) => (
                <FieldCard key={field.id} {...field} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest bookings and interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-sport-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">
                    Booked Elite Soccer Complex for January 15th
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Rated Basketball Court A - 5 stars</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Added Tennis Court 1 to favorites</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
