import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Trophy, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Komunitas di Utama",
      description:
        "Kami percaya olahraga menyatukan orang dan membangun komunitas yang lebih kuat.",
    },
    {
      icon: MapPin,
      title: "Fokus Lokal",
      description:
        "Mendukung fasilitas olahraga lokal agar dapat diakses oleh semua kalangan.",
    },
    {
      icon: Trophy,
      title: "Keunggulan",
      description:
        "Kami berusaha memberikan kualitas terbaik pada platform dan fasilitas mitra kami.",
    },
    {
      icon: Heart,
      title: "Semangat Olahraga",
      description: "Kecintaan kami pada olahraga adalah alasan kami terus berkembang.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-sport-50 text-sport-700 hover:bg-sport-100">
              Tentang ArenaKita
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Olahraga Mudah Diakses
              <span className="block gradient-text">Untuk Semua Orang</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ArenaKita hadir dengan satu misi sederhana: memudahkan siapa saja dalam mencari, memesan, dan bermain olahraga. Kami menghubungkan atlet dengan fasilitas premium sambil mendukung komunitas olahraga lokal.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Kisah Kami</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ArenaKita berawal dari pengalaman para pendirinya yang kesulitan mencari lapangan basket untuk bermain rutin setiap minggu. Setelah menelepon puluhan tempat dan menghadapi sistem pemesanan yang rumit, kami yakin harus ada cara yang lebih baik.
                </p>
                <p>
                  Kini, kami telah bermitra dengan ratusan fasilitas olahraga di seluruh Indonesia. Siapa pun bisa menemukan dan memesan lapangan terbaik dengan mudah — mulai dari pertandingan santai hingga turnamen kompetitif.
                </p>
                <p>
                  ArenaKita bukan sekadar platform booking. Kami membangun komunitas yang menyatukan orang lewat olahraga, mendukung usaha lokal, dan mendorong gaya hidup aktif dan sehat.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-sport-50 to-sport-100 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-sport-600 mb-2">
                  2019
                </div>
                <div className="text-muted-foreground">Tahun Berdiri</div>
                <div className="mt-6 text-2xl font-bold text-sport-600 mb-2">
                  500+
                </div>
                <div className="text-muted-foreground">Mitra Fasilitas</div>
                <div className="mt-6 text-2xl font-bold text-sport-600 mb-2">
                  10.000+
                </div>
                <div className="text-muted-foreground">Pengguna Bahagia</div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Nilai-Nilai Kami
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Prinsip ini menjadi panduan dalam segala hal yang kami lakukan dan membantu kami tetap fokus pada hal yang terpenting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="text-center border-none shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Bergabung Bersama Kami
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Kami selalu mencari orang-orang hebat yang mencintai olahraga dan ingin membuat perubahan. Lihat posisi yang tersedia dan bantu kami membangun masa depan booking olahraga.
            </p>
            <div className="inline-flex gap-4">
              <button className="px-6 py-3 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity">
                Lihat Lowongan
              </button>
              <button className="px-6 py-3 border border-sport-200 text-sport-600 rounded-lg hover:bg-sport-50 transition-colors">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
