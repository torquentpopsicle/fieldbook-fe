import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  AlertCircle,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Fields",
      value: "24",
      change: "+2 this month",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Bookings",
      value: "156",
      change: "+12% from last week",
      icon: Calendar,
      color: "text-sport-600",
      bgColor: "bg-sport-50",
    },
    {
      title: "Total Customers",
      value: "2,341",
      change: "+180 this month",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Monthly Revenue",
      value: "$12,450",
      change: "+23% from last month",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const recentBookings = [
    {
      id: "1",
      field: "Elite Soccer Complex",
      customer: "John Doe",
      date: "2024-01-15",
      time: "14:00 - 16:00",
      status: "confirmed",
      amount: "$75",
    },
    {
      id: "2",
      field: "Basketball Court A",
      customer: "Sarah Wilson",
      date: "2024-01-15",
      time: "18:00 - 20:00",
      status: "pending",
      amount: "$45",
    },
    {
      id: "3",
      field: "Tennis Court 1",
      customer: "Mike Johnson",
      date: "2024-01-16",
      time: "09:00 - 10:30",
      status: "confirmed",
      amount: "$60",
    },
    {
      id: "4",
      field: "Volleyball Arena",
      customer: "Emily Brown",
      date: "2024-01-16",
      time: "16:00 - 18:00",
      status: "cancelled",
      amount: "$55",
    },
  ];

  const alerts = [
    {
      type: "warning",
      message: "Soccer Field B requires maintenance - scheduled for tomorrow",
      time: "2 hours ago",
    },
    {
      type: "info",
      message: "New booking policy update has been published",
      time: "1 day ago",
    },
    {
      type: "error",
      message: "Payment failed for booking #1234 - requires attention",
      time: "3 hours ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Selamat Datang! Kelola sistem kamu disini
          </p>
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
                  <div className={`rounded-full p-2 ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Booking Terbaru</CardTitle>
              <CardDescription>
                Daftar Booking Terbaru dan Status Pembayaran
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{booking.field}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {booking.customer} • {booking.date}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="font-medium">{booking.amount}</div>
                      <Badge
                        className={`text-xs ${getStatusColor(booking.status)}`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline">Lihat Semua Booking</Button>
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifikasi Penting!</CardTitle>
              <CardDescription>
                Update & Notifikasi Penting!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex space-x-3 p-3 border rounded-lg"
                  >
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  Lihat Semua Notifikasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Shortcut Cepat</CardTitle>
            <CardDescription>
              Kelola Manajemen Sistem Kamu Di sini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <Building2 className="h-6 w-6" />
                <span>Add Lapangan Terbaru</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <Calendar className="h-6 w-6" />
                <span>Lihat Jadwal</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <Users className="h-6 w-6" />
                <span>Kelola Customer</span>
              </Button>
              <Button className="h-20 flex-col space-y-2" variant="outline">
                <DollarSign className="h-6 w-6" />
                <span>Laporan Keuangan</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
