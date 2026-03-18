import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ServiceCard = ({ icon: Icon, title, description, path, isPopular }) => {
  return (
    <Link to={path} className="group block">
      <div className="relative bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        {isPopular && (
          <Badge className="absolute -top-2 right-4 bg-gold text-navy border-0 font-medium">
            Popular
          </Badge>
        )}
        
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-xl bg-gold-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6 text-gold-dark" />
          </div>
          
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {description}
          </p>
          
          <span className="inline-flex items-center gap-1 text-sm font-medium text-navy group-hover:text-gold transition-colors">
            Learn more
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};
