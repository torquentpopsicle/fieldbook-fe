import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, PlayCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Find Your Field",
      description:
        "Search for sports facilities by location, sport type, and availability. Browse hundreds of verified venues.",
      step: "01",
    },
    {
      icon: Calendar,
      title: "Book Instantly",
      description:
        "Select your preferred time slot and book instantly. Secure payment and instant confirmation guaranteed.",
      step: "02",
    },
    {
      icon: PlayCircle,
      title: "Play & Enjoy",
      description:
        "Show up and play! All fields come with essential equipment and facilities. Focus on your game.",
      step: "03",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tips Booking Anti Ribet</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tinggal satset, booking cepat dan termurah!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="relative border-none shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="pt-12 pb-8 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sport-50 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-sport-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Connection Lines - Desktop Only */}
        {/* <div className="hidden md:block relative -mt-24 pt-24">
          <div className="absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-sport-200 via-sport-300 to-sport-200"></div>
          <div className="absolute top-20 left-1/6 w-2 h-2 bg-sport-400 rounded-full transform -translate-x-1/2"></div>
          <div className="absolute top-20 right-1/6 w-2 h-2 bg-sport-400 rounded-full transform translate-x-1/2"></div>
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorks;
