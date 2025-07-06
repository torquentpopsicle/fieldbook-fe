import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Trophy, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description:
        "We believe sports bring people together and build stronger communities.",
    },
    {
      icon: MapPin,
      title: "Local Focus",
      description:
        "Supporting local sports facilities and making them accessible to everyone.",
    },
    {
      icon: Trophy,
      title: "Excellence",
      description:
        "We strive for the highest quality in both our platform and partner facilities.",
    },
    {
      icon: Heart,
      title: "Passion for Sports",
      description: "Our love for sports drives everything we do.",
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
              About FieldBook
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Making Sports Accessible
              <span className="block gradient-text">For Everyone</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              FieldBook was founded with a simple mission: to make it easier for
              people to find, book, and play sports. We connect athletes with
              premium facilities while supporting local sports communities.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  FieldBook started when our founders struggled to find
                  available basketball courts for their weekly games. After
                  calling dozens of facilities and dealing with outdated booking
                  systems, they realized there had to be a better way.
                </p>
                <p>
                  Today, we've partnered with hundreds of sports facilities
                  across the country, making it simple for anyone to discover
                  and book their perfect playing venue. From casual pickup games
                  to competitive tournaments, FieldBook serves athletes of all
                  levels.
                </p>
                <p>
                  We're more than just a booking platform - we're building a
                  community where sports bring people together, support local
                  businesses, and promote healthy, active lifestyles.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-sport-50 to-sport-100 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-sport-600 mb-2">
                  2019
                </div>
                <div className="text-muted-foreground">Founded</div>
                <div className="mt-6 text-2xl font-bold text-sport-600 mb-2">
                  500+
                </div>
                <div className="text-muted-foreground">Partner Facilities</div>
                <div className="mt-6 text-2xl font-bold text-sport-600 mb-2">
                  10K+
                </div>
                <div className="text-muted-foreground">Happy Athletes</div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These principles guide everything we do and help us stay focused
                on what matters most.
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
              Join Our Team
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              We're always looking for passionate people who love sports and
              want to make a difference. Check out our open positions and help
              us build the future of sports booking.
            </p>
            <div className="inline-flex gap-4">
              <button className="px-6 py-3 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity">
                View Open Positions
              </button>
              <button className="px-6 py-3 border border-sport-200 text-sport-600 rounded-lg hover:bg-sport-50 transition-colors">
                Learn More
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
