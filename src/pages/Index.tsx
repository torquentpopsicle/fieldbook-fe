import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedFields from "@/components/featured-fields";
import HowItWorks from "@/components/how-it-works";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Star, Users, MapPin, Trophy } from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Pengguna Aktif", value: "10K+", icon: Users },
    { label: "Lapangan Terdaftar", value: "500+", icon: MapPin },
    { label: "Kota Tersedia", value: "25+", icon: Trophy },
    { label: "Booking/Bulan", value: "5K+", icon: Clock },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Lapangan Terverifikasi",
      description:
        "Semua lapangan telah dicek dan dipelihara sesuai standar tinggi untuk kenyamanan dan keamanan kamu.",
    },
    {
      icon: Clock,
      title: "Booking 24 Jam",
      description:
        "Pesan kapan saja, di mana saja. ArenaKita siap sedia 24 jam penuh untuk kemudahan kamu.",
    },
    {
      icon: Star,
      title: "Harga Terbaik",
      description:
        "Dapatkan promo eksklusif dan tarif bersaing untuk fasilitas olahraga terbaik. Murah tapi tetap berkualitas!",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sport-50 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-sport-600" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-sport-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Fields */}
        <FeaturedFields />

        {/* How It Works */}
        <HowItWorks />

        {/* Benefits Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-sport-50 text-sport-700 hover:bg-sport-100">
                Kenapa ArenaKita?
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Platform terbaik untuk booking lapangan olahraga dengan mudah, cepat, dan harga terjangkau!
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Semua proses aman, instan, dan anti ribet.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={index}
                    className="border-none shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <CardContent className="pt-8 pb-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-bg flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Siap Bermain?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Yuk, langsung booking lapangan favoritmu sekarang. Banyak atlet & komunitas sudah percaya ArenaKita!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-sport-600 hover:bg-white/90"
                >
                  Booking Sekarang
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/90 hover:text-sport-600"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
