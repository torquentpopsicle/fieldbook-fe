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
      field: "Kompleks Sepak Bola Elite",
      date: "2024-01-15",
      time: "14:00 - 16:00",
      status: "confirmed",
      location: "Pusat Olahraga Kota",
      price: 75,
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      field: "Lapangan Basket A",
      date: "2024-01-18",
      time: "18:00 - 20:00",
      status: "confirmed",
      location: "Sport Hub Barat",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      field: "Lapangan Tenis 1",
      date: "2024-01-20",
      time: "09:00 - 10:30",
      status: "pending",
      location: "Tennis Center Riverside",
      price: 60,
      image:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
    },
  ];

  const recommendedFields = [
    {
      id: 1,
      name: "Arena Futsal Premium",
      address: "Kompleks Olahraga Utara",
      images:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
      price_per_hour: 65000,
      rating: 4.8,
      reviews_count: 89,
      capacity: 12,
      sport_type: "Futsal",
      availability_summary: "Tersedia hari ini",
      facilities: [
        "Indoor",
        "Lapangan Profesional",
        "Sistem Suara",
        "Pencahayaan",
      ],
      currency: "Rp",
    },
    {
      id: 2,
      name: "Lapangan Voli Pro",
      address: "Rekreasi Barat",
      images:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      price_per_hour: 55000,
      rating: 4.6,
      reviews_count: 156,
      capacity: 12,
      sport_type: "Voli",
      availability_summary: "Tersedia besok",
      facilities: ["Indoor", "Net Profesional", "Parkir", "Kafe"],
      currency: "Rp",
    },
  ];

  const stats = [
    {
      title: "Total Booking",
      value: "12",
      change: "+3 bulan ini",
      icon: Calendar,
    },
    {
      title: "Total Jam Main",
      value: "28",
      change: "+6 bulan ini",
      icon: Clock,
    },
    {
      title: "Lapangan Favorit",
      value: "5",
      change: "+2 baru-baru ini",
      icon: Star,
    },
    {
      title: "Total Pengeluaran",
      value: "Rp840.000",
      change: "+Rp180.000 bulan ini",
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
            <h2 className="text-3xl font-bold tracking-tight">Selamat Datang!</h2>
            <p className="text-muted-foreground">
              Siap untuk booking lagi?
            </p>
          </div>
          <Button className="gradient-bg hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Booking Baru
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
                <CardTitle>Booking Mendatang</CardTitle>
                <CardDescription>
                  Jadwal pemesanan lapangan olahragamu
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Lihat Semua
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
                          {booking.status === "confirmed" ? "Terkonfirmasi" : booking.status === "pending" ? "Menunggu" : booking.status}
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
                        Rp{booking.price}.000
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Kelola
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Shortcut Cepat</CardTitle>
              <CardDescription>Klik di sini, anti ribet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Cari Lapangan Tersedia
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Ubah Jadwal Booking
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Berikan Ratingmu
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Undang Teman
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Fields */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Rekomendasi Buat Kamu</CardTitle>
              <CardDescription>
                Berdasarkan histori pemesanan kamu
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" />
              Jelajahi Semua
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
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Riwayat terakhir booking dan aktivitas kamu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-sport-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">
                    Booking Kompleks Sepak Bola Elite untuk 20 Mei
                  </p>
                  <p className="text-xs text-muted-foreground">2 jam lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Memberi rating Lapangan Basket A - 5 bintang</p>
                  <p className="text-xs text-muted-foreground">1 hari lalu</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Menambahkan Lapangan Tenis Pemuda</p>
                  <p className="text-xs text-muted-foreground">3 hari lalu</p>
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
