import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-gradient py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
          {t.hero.title1}
          <br />
          <span className="text-gold">{t.hero.title2}</span>
        </h1>
        
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link to="/ask">
            <Button variant="gold" size="xl" className="w-full sm:w-auto px-8">
              <Sparkles className="h-5 w-5" />
              {t.hero.askAI}
            </Button>
          </Link>
          <Link to="/document">
            <Button variant="outline" size="xl" className="w-full sm:w-auto px-8 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <FileText className="h-5 w-5" />
              {t.hero.uploadDocument}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
