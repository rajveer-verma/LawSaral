import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X, Globe, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserMenu } from "@/components/auth/UserMenu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, isLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.askAI, path: "/ask" },
    { label: t.nav.emergencyHelp, path: "/emergency" },
    { label: t.nav.documentExplainer, path: "/document" },
    { label: t.nav.mythBuster, path: "/myths" },
    { label: t.nav.stateLaws, path: "/states" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy">
                <Scale className="h-5 w-5 text-gold" />
              </div>
              <span className="text-xl font-display font-bold">
                <span className="text-navy">Law</span>
                <span className="text-gold">Saral</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
                <button 
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    language === "en"
                      ? "bg-navy text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage("hi")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    language === "hi"
                      ? "bg-navy text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  हि
                </button>
              </div>
              {!isLoading && (
                user ? (
                  <UserMenu />
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <User className="h-4 w-4" />
                    {t.nav.login}
                  </Button>
                )
              )}
            </div>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-secondary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-fade-in">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
                  <button 
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      language === "en"
                        ? "bg-navy text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setLanguage("hi")}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      language === "hi"
                        ? "bg-navy text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    हि
                  </button>
                </div>
                {!isLoading && (
                  user ? (
                    <UserMenu />
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsAuthModalOpen(true);
                      }}
                    >
                      <User className="h-4 w-4" />
                      {t.nav.login}
                    </Button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
