import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Search, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { mythsData } from "@/data/mythsData";

const MythBuster = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [revealedMyths, setRevealedMyths] = useState([]);
  const { t, language } = useLanguage();

  const myths = mythsData[language];
  const categories = t.myths.categories;

  const filteredMyths = myths.filter((myth) => {
    const matchesCategory = selectedCategoryIndex === 0 || myth.category === categories[selectedCategoryIndex];
    const matchesSearch = myth.myth.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleReveal = (index) => {
    setRevealedMyths((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="goldOutline" className="mb-4">
              <Lightbulb className="h-3 w-3 mr-1" />
              {t.myths.badge}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.myths.title}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t.myths.subtitle}
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.myths.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategoryIndex(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategoryIndex === index
                    ? "bg-gold text-navy"
                    : "bg-card border border-border text-foreground hover:border-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Myths Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredMyths.map((myth, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Badge variant="destructive" className="text-xs shrink-0">
                    {myth.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-destructive text-sm font-medium">
                    <X className="h-4 w-4" />
                    {t.common.myth}
                  </div>
                </div>
                <p className="font-display font-semibold text-foreground mb-3">
                  "{myth.myth}"
                </p>
                {revealedMyths.includes(index) ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">{myth.truth}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleReveal(index)}
                    className="text-gold text-sm font-medium hover:underline"
                  >
                    {t.myths.revealTruth}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MythBuster;
