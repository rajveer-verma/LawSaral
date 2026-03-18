import { ServiceCard } from "./ServiceCard";
import { MessageSquare, FileSearch, AlertTriangle, Lightbulb, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: MessageSquare,
      title: t.services.askAI.title,
      description: t.services.askAI.description,
      path: "/ask",
    },
    {
      icon: FileSearch,
      title: t.services.documentExplainer.title,
      description: t.services.documentExplainer.description,
      path: "/document",
    },
    {
      icon: AlertTriangle,
      title: t.services.emergencyHelp.title,
      description: t.services.emergencyHelp.description,
      path: "/emergency",
    },
    {
      icon: Lightbulb,
      title: t.services.mythBuster.title,
      description: t.services.mythBuster.description,
      path: "/myths",
      isPopular: true,
    },
    {
      icon: MapPin,
      title: t.services.stateLaws.title,
      description: t.services.stateLaws.description,
      path: "/states",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-3">
            {t.services.heading}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.services.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.path} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};
