import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Info, Sparkles, MessageCircle, Scale } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { stateLawsData, statesMap, states } from "@/data/stateLawsData";

const StateLaws = () => {
  const [selectedState, setSelectedState] = useState("");
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const stateData = selectedState ? stateLawsData[selectedState] : null;
  const hasStateLaws = stateData && stateData.laws.length > 0;

  const handleAskMore = (question) => {
    navigate("/ask", { state: { prefillQuestion: question } });
  };

  const handleAskCustom = () => {
    const question = language === "hi" 
      ? `${selectedState || "भारत"} में कानून के बारे में बताएं`
      : `Tell me about laws in ${selectedState || "India"}`;
    navigate("/ask", { state: { prefillQuestion: question } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="goldOutline" className="mb-4">
              <MapPin className="h-3 w-3 mr-1" />
              {t.stateLaws.badge}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.stateLaws.title}
            </h1>
            <p className="text-muted-foreground">
              {t.stateLaws.subtitle}
            </p>
          </div>

          {/* State Selector */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-light flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-gold-dark" />
              </div>
              <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                {t.stateLaws.selectState}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-gold min-w-[200px]"
                >
                  <option value="">
                    {language === "hi" ? "-- राज्य चुनें --" : "-- Select State --"}
                  </option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {language === "hi" ? statesMap[state] : state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notable Laws Section */}
          <div className="mb-8">
            <h3 className="font-display font-semibold text-xl text-foreground mb-6 text-center">
              {selectedState 
                ? (language === "hi" ? `${statesMap[selectedState]} में उल्लेखनीय कानून` : `Notable Laws in ${selectedState}`)
                : t.stateLaws.selectStatePrompt
              }
            </h3>

            {!selectedState && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  {language === "hi" 
                    ? "उल्लेखनीय स्थानीय कानून देखने के लिए ऊपर एक राज्य चुनें"
                    : "Select a state above to see notable local laws"
                  }
                </p>
              </div>
            )}

            {selectedState && hasStateLaws && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stateData.laws.map((law, index) => (
                  <Card key={index} className="border-border hover:border-gold/50 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center shrink-0">
                          <Scale className="h-5 w-5 text-gold-dark" />
                        </div>
                        <h4 className="font-display font-semibold text-foreground">
                          {language === "hi" ? law.titleHi : law.title}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === "hi" ? law.descriptionHi : law.description}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full gap-2"
                        onClick={() => handleAskMore(language === "hi" ? law.askQuestionHi : law.askQuestion)}
                      >
                        <MessageCircle className="h-4 w-4" />
                        {language === "hi" ? "और जानें" : "Ask More"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {selectedState && !hasStateLaws && (
              <div className="bg-secondary/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  {language === "hi" 
                    ? "यह राज्य मुख्य रूप से सामान्य भारतीय कानूनों का पालन करता है, मामूली स्थानीय भिन्नताओं के साथ।"
                    : "This state mostly follows general Indian laws, with minor local variations."
                  }
                </p>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-navy rounded-xl p-6 text-primary-foreground mb-8">
            <div className="flex items-start gap-4">
              <Info className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-2">{t.stateLaws.whyMatters}</h4>
                <p className="text-sm text-primary-foreground/80">
                  {t.stateLaws.whyMattersDesc}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="gold" size="lg" onClick={handleAskCustom}>
              <Sparkles className="h-4 w-4" />
              {t.stateLaws.askCustom}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StateLaws;
