import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, MessageCircle, Users } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Hubungi kita via emaail, customer tersedia 24 jam full.",
      contact: "halo@arenakita.com",
      action: "Kirim Email",
    },
    {
      icon: Phone,
      title: "Telepon",
      description: "Layanan telepon juga tersedia",
      contact: "+62 821-3778-3251",
      action: "Telepon Sekarang",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat dengan admin secara langsung",
      contact: "Tersedia pukul 08.00 - 22.00",
      action: "Mulai Chat",
    },
  ];

  const offices = [
    {
      city: "Semarang",
      address: "Jalan Pendrikan Kidul",
      phone: "+62 821-3778-3251",
      email: "halo@arenakita.com",
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-sport-50 text-sport-700 hover:bg-sport-100">
              Contact Us
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions? Need support? Want to partner with us? We'd love
              to hear from you. Our team is here to help with whatever you need.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        First Name
                      </label>
                      <Input placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Last Name
                      </label>
                      <Input placeholder="Your last name" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Subject
                    </label>
                    <Input placeholder="What's this about?" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us more about your question or feedback..."
                      className="min-h-32"
                    />
                  </div>

                  <Button className="w-full gradient-bg hover:opacity-90">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-sport-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-sport-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{method.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {method.description}
                          </p>
                          <p className="text-sm font-medium text-sport-600 mb-3">
                            {method.contact}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            {method.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Office Locations */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Kantor ArenaKita
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Kunjungi kantor pusat kita.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offices.map((office, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-md transition-shadow"
                >
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>{office.address}</p>
                      <p className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {office.phone}
                      </p>
                      <p className="flex items-center justify-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {office.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Looking for quick answers? Check out our FAQ section for common
              questions about booking, payments, and using FieldBook.
            </p>
            <Button variant="outline" size="lg">
              View FAQ
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
