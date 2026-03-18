import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t.nav.askAI, path: "/ask" },
    { label: t.nav.emergencyHelp, path: "/emergency" },
    { label: t.nav.documentExplainer, path: "/document" },
    { label: t.nav.mythBuster, path: "/myths" },
    { label: t.nav.stateLaws, path: "/states" },
  ];

  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="bg-cream-dark border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>{t.footer.disclaimer}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold">
                <Scale className="h-5 w-5 text-navy" />
              </div>
              <span className="text-xl font-display font-bold">
                <span className="text-primary-foreground">Law</span>
                <span className="text-gold">Saral</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t.footer.brandDescription}
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 text-gold" />
                support@lawsaral.in
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 text-gold" />
                1800-XXX-XXXX (Toll Free)
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 text-gold" />
                Legal Awareness Initiative, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-destructive/90">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-destructive-foreground">
            <span className="font-semibold">{t.footer.importantDisclaimer}</span> {t.footer.disclaimerText}
          </p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-primary-foreground/50">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
