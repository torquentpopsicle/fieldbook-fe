import { useState, useEffect } from "react";
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
import {
  Search,
  Filter,
  MapPin,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import { apiGet, API_ENDPOINTS } from "@/lib/api";

// ...import tetap seperti aslinya

const BrowseFields = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportType, setSportType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("recommended");
  const [allFields, setAllFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setAllFields(data.data || data || []);
      } catch (err) {
        console.error("Error fetching fields:", err);
        setError("Gagal memuat data lapangan. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const sportTypes = [
    "Sepak Bola",
    "Basket",
    "Tenis",
    "Voli",
    "Futsal",
    "Badminton",
  ];
  const features = [
    "Dalam Ruangan",
    "Luar Ruangan",
    "Parkir",
    "Ruang Ganti",
    "Sewa Peralatan",
    "Lampu Stadion",
    "AC",
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Telusuri Lapangan Olahraga
            </h1>
            <p className="text-muted-foreground text-lg">
              Temukan lapangan ideal untuk pertandinganmu berikutnya
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari lokasi, nama lapangan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Jenis Olahraga */}
              <Select value={sportType} onValueChange={setSportType}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Semua Olahraga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Olahraga</SelectItem>
                  {sportTypes.map((sport) => (
                    <SelectItem key={sport} value={sport.toLowerCase()}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Urutkan */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Rekomendasi</SelectItem>
                  <SelectItem value="price-low">Harga: Termurah</SelectItem>
                  <SelectItem value="price-high">Harga: Termahal</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                  <SelectItem value="newest">Terbaru</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Aktif */}
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
              {(priceRange[0] > 0 || priceRange[1] < 200) && (
                <Badge variant="secondary">
                  Rp{priceRange[0]} - Rp{priceRange[1]}
                  <button
                    onClick={() => setPriceRange([0, 200])}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Harga */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Rentang Harga (per jam)
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      step={5}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Rp{priceRange[0]}</span>
                      <span>Rp{priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Fasilitas */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Fasilitas
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

                  {/* Ketersediaan */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Ketersediaan
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available-now" />
                        <label htmlFor="available-now" className="text-sm">
                          Tersedia Sekarang
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available-today" />
                        <label htmlFor="available-today" className="text-sm">
                          Tersedia Hari Ini
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="available-weekend" />
                        <label htmlFor="available-weekend" className="text-sm">
                          Tersedia Akhir Pekan
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hasil Pencarian */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {loading
                    ? "Memuat..."
                    : `Menampilkan ${allFields.length} hasil`}
                </p>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Memuat lapangan...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>
                      Coba Lagi
                    </Button>
                  </div>
                </div>
              ) : allFields.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-muted-foreground">Lapangan tidak ditemukan.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {allFields.map((field) => (
                    <FieldCard key={field.id} {...field} />
                  ))}
                </div>
              )}

              {/* Tombol Load More */}
              {!loading && !error && allFields.length > 0 && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    Tampilkan Lebih Banyak
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrowseFields;

