import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Phone, 
  Shield, 
  Users, 
  Car, 
  Building2, 
  CheckCircle, 
  XCircle,
  Clock,
  Sparkles,
  Scale,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const helplines = [
  { label: "Police", number: "100" },
  { label: "Emergency", number: "112" },
  { label: "Women Helpline", number: "181" },
  { label: "Workplace Harassment", number: "155214" },
];

const situationsData = [
  {
    id: "arrest",
    icon: Shield,
    label: "Police Detention / Arrest",
    labelHi: "पुलिस हिरासत / गिरफ्तारी",
    description: "Know your rights when stopped, questioned, or arrested",
    descriptionHi: "रोके जाने, पूछताछ, या गिरफ्तारी पर अपने अधिकार जानें",
    helpline: "100",
    steps: [
      "Stay calm and be polite",
      "Ask for the reason of detention",
      "You have the right to remain silent",
      "Request to call a lawyer or family member",
      "Do not sign any blank papers",
      "Note down badge numbers of officers",
    ],
    stepsHi: [
      "शांत रहें और विनम्र रहें",
      "हिरासत का कारण पूछें",
      "आपको चुप रहने का अधिकार है",
      "वकील या परिवार के सदस्य को कॉल करने का अनुरोध करें",
      "किसी भी खाली कागज पर हस्ताक्षर न करें",
      "अधिकारियों के बैज नंबर नोट करें",
    ],
    dos: [
      "Ask for arrest warrant (for non-cognizable offences)",
      "Inform a family member immediately",
      "Remember officer details",
      "Request female officer if you're a woman",
    ],
    dosHi: [
      "गिरफ्तारी वारंट मांगें (गैर-संज्ञेय अपराधों के लिए)",
      "तुरंत परिवार के सदस्य को सूचित करें",
      "अधिकारी का विवरण याद रखें",
      "यदि आप महिला हैं तो महिला अधिकारी का अनुरोध करें",
    ],
    donts: [
      "Do not resist arrest physically",
      "Do not make confessions without lawyer",
      "Do not sign anything without reading",
      "Do not offer bribes",
    ],
    dontsHi: [
      "शारीरिक रूप से गिरफ्तारी का विरोध न करें",
      "वकील के बिना कोई स्वीकारोक्ति न करें",
      "बिना पढ़े किसी चीज़ पर हस्ताक्षर न करें",
      "रिश्वत न दें",
    ],
    laws: [
      "Article 22 - Protection against arrest",
      "Section 41 CrPC - When arrest can be made",
      "Section 50 CrPC - Right to know grounds of arrest",
    ],
  },
  {
    id: "domestic",
    icon: Users,
    label: "Domestic Violence",
    labelHi: "घरेलू हिंसा",
    description: "Protection and immediate help for victims",
    descriptionHi: "पीड़ितों के लिए सुरक्षा और तत्काल मदद",
    helpline: "181",
    steps: [
      "Reach a safe place immediately",
      "Call Women Helpline 181",
      "Contact local police station",
      "Seek medical help if injured",
      "File a complaint / DIR",
      "Apply for protection order",
    ],
    stepsHi: [
      "तुरंत सुरक्षित जगह पहुंचें",
      "महिला हेल्पलाइन 181 पर कॉल करें",
      "स्थानीय पुलिस स्टेशन से संपर्क करें",
      "घायल होने पर चिकित्सा सहायता लें",
      "शिकायत / DIR दर्ज करें",
      "सुरक्षा आदेश के लिए आवेदन करें",
    ],
    dos: [
      "Document all injuries with photos",
      "Save evidence of abuse (messages, recordings)",
      "Keep important documents safe",
      "Seek help from NGOs and support groups",
    ],
    dosHi: [
      "सभी चोटों की फोटो लें",
      "दुर्व्यवहार के सबूत सहेजें (संदेश, रिकॉर्डिंग)",
      "महत्वपूर्ण दस्तावेज़ सुरक्षित रखें",
      "NGO और सहायता समूहों से मदद लें",
    ],
    donts: [
      "Do not ignore the abuse",
      "Do not blame yourself",
      "Do not stay isolated",
      "Do not hesitate to seek legal help",
    ],
    dontsHi: [
      "दुर्व्यवहार को नज़रअंदाज़ न करें",
      "खुद को दोष न दें",
      "अकेले न रहें",
      "कानूनी मदद लेने में संकोच न करें",
    ],
    laws: [
      "Protection of Women from Domestic Violence Act, 2005",
      "Section 498A IPC - Cruelty by husband",
      "Section 304B IPC - Dowry death",
    ],
  },
  {
    id: "accident",
    icon: Car,
    label: "Road Accident",
    labelHi: "सड़क दुर्घटना",
    description: "Legal steps, insurance, and procedures after an accident",
    descriptionHi: "दुर्घटना के बाद कानूनी कदम, बीमा और प्रक्रियाएं",
    helpline: "112",
    steps: [
      "Stop and check for injuries",
      "Call emergency services - 112",
      "Help injured persons get medical care",
      "Note down vehicle numbers and witness details",
      "Take photos of the scene",
      "File FIR within 24 hours",
    ],
    stepsHi: [
      "रुकें और चोटों की जांच करें",
      "आपातकालीन सेवाओं को कॉल करें - 112",
      "घायलों को चिकित्सा सहायता दिलाएं",
      "वाहन नंबर और गवाहों का विवरण नोट करें",
      "घटनास्थल की फोटो लें",
      "24 घंटे के भीतर FIR दर्ज करें",
    ],
    dos: [
      "Help the injured (Section 134 of Motor Vehicles Act protects Good Samaritans)",
      "Exchange insurance details with other party",
      "Inform your insurance company promptly",
      "Get a copy of the police report",
    ],
    dosHi: [
      "घायलों की मदद करें (मोटर वाहन अधिनियम की धारा 134 गुड समैरिटन्स की रक्षा करती है)",
      "दूसरे पक्ष के साथ बीमा विवरण का आदान-प्रदान करें",
      "अपनी बीमा कंपनी को तुरंत सूचित करें",
      "पुलिस रिपोर्ट की प्रति प्राप्त करें",
    ],
    donts: [
      "Do not flee the scene",
      "Do not admit fault at the scene",
      "Do not argue with other parties",
      "Do not delay FIR filing",
    ],
    dontsHi: [
      "घटनास्थल से न भागें",
      "घटनास्थल पर गलती न मानें",
      "दूसरे पक्षों से बहस न करें",
      "FIR दर्ज करने में देरी न करें",
    ],
    laws: [
      "Section 134 - Duty to stop and give information",
      "Section 185 - Drunk driving penalties",
      "Motor Vehicles Act, 1988",
    ],
  },
  {
    id: "workplace",
    icon: Building2,
    label: "Workplace Harassment",
    labelHi: "कार्यस्थल उत्पीड़न",
    description: "POSH Act and complaint procedures",
    descriptionHi: "POSH अधिनियम और शिकायत प्रक्रियाएं",
    helpline: "181",
    steps: [
      "Document all incidents with dates and details",
      "Report to Internal Complaints Committee (ICC)",
      "File written complaint within 3 months",
      "Keep copies of all communications",
      "Follow up on the complaint status",
      "Seek legal help if organization doesn't respond",
    ],
    stepsHi: [
      "सभी घटनाओं को तारीखों और विवरण के साथ दस्तावेज़ करें",
      "आंतरिक शिकायत समिति (ICC) को रिपोर्ट करें",
      "3 महीने के भीतर लिखित शिकायत दर्ज करें",
      "सभी संचारों की प्रतियां रखें",
      "शिकायत की स्थिति पर फॉलो अप करें",
      "संगठन जवाब न दे तो कानूनी मदद लें",
    ],
    dos: [
      "Know your company's POSH policy",
      "Identify ICC members in your organization",
      "Save all evidence (emails, messages, witnesses)",
      "Seek support from colleagues who witnessed the incident",
    ],
    dosHi: [
      "अपनी कंपनी की POSH नीति जानें",
      "अपने संगठन में ICC सदस्यों की पहचान करें",
      "सभी सबूत सहेजें (ईमेल, संदेश, गवाह)",
      "घटना के गवाह सहकर्मियों से सहयोग लें",
    ],
    donts: [
      "Do not confront the harasser alone",
      "Do not share complaint details publicly",
      "Do not resign immediately without legal advice",
      "Do not destroy any evidence",
    ],
    dontsHi: [
      "उत्पीड़क का अकेले सामना न करें",
      "शिकायत विवरण सार्वजनिक रूप से साझा न करें",
      "कानूनी सलाह के बिना तुरंत इस्तीफा न दें",
      "कोई भी सबूत नष्ट न करें",
    ],
    laws: [
      "Sexual Harassment of Women at Workplace Act, 2013 (POSH Act)",
      "Section 354A IPC - Sexual harassment",
      "Vishaka Guidelines",
    ],
  },
];

const EmergencyHelp = () => {
  const [selectedSituation, setSelectedSituation] = useState("arrest");
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const isHindi = language === "hi";

  const currentSituation = situationsData.find((s) => s.id === selectedSituation) || situationsData[0];
  const CurrentIcon = currentSituation.icon;

  const handleAskAI = () => {
    const question = isHindi
      ? `${currentSituation.labelHi} के बारे में और जानकारी दें`
      : `Tell me more about ${currentSituation.label}`;
    navigate("/ask", { state: { prefillQuestion: question } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="destructive" className="mb-4">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {t.emergency.badge}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.emergency.title}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t.emergency.subtitle}
            </p>
          </div>

          {/* Helpline Bar */}
          <div className="bg-gold-light rounded-xl p-4 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {helplines.map((line, index) => (
                <div key={line.number} className="flex items-center gap-2 text-navy">
                  <Phone className="h-4 w-4" />
                  <span className="font-semibold">{line.label}:</span>
                  <span>{line.number}</span>
                  {index < helplines.length - 1 && (
                    <span className="hidden md:inline text-navy/30 ml-4">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Situation Selector */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-display font-semibold text-lg mb-4">{t.emergency.selectSituation}</h2>
                <div className="space-y-2">
                  {situationsData.map((situation) => {
                    const SituationIcon = situation.icon;
                    const isSelected = selectedSituation === situation.id;
                    return (
                      <button
                        key={situation.id}
                        onClick={() => setSelectedSituation(situation.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                          isSelected
                            ? "border-gold bg-gold-light"
                            : "border-border hover:border-gold/50 hover:bg-secondary/50"
                        }`}
                      >
                        <SituationIcon className={`h-5 w-5 ${
                          isSelected ? "text-gold-dark" : "text-muted-foreground"
                        }`} />
                        <div className="flex-1 text-left">
                          <p className="font-medium text-foreground text-sm">
                            {isHindi ? situation.labelHi : situation.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.emergency.helpline}: {situation.helpline}
                          </p>
                        </div>
                        <ChevronRight className={`h-4 w-4 ${
                          isSelected ? "text-gold-dark" : "text-muted-foreground"
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Guidance Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border p-6">
                {/* Title */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border bg-sky-50 -mx-6 -mt-6 p-6 rounded-t-xl">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                    <CurrentIcon className="h-6 w-6 text-sky-600" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-foreground">
                      {isHindi ? currentSituation.labelHi : currentSituation.label}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {isHindi ? currentSituation.descriptionHi : currentSituation.description}
                    </p>
                  </div>
                </div>

                {/* Immediate Steps */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-gold" />
                    <h3 className="font-semibold text-foreground">{t.emergency.immediateSteps}</h3>
                  </div>
                  <div className="space-y-3">
                    {(isHindi ? currentSituation.stepsHi : currentSituation.steps).map((step, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-gold text-navy text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-foreground text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Do's and Don'ts */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">{t.emergency.dos}</h4>
                    </div>
                    <ul className="space-y-2">
                      {(isHindi ? currentSituation.dosHi : currentSituation.dos).map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                          <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold text-red-800">{t.emergency.donts}</h4>
                    </div>
                    <ul className="space-y-2">
                      {(isHindi ? currentSituation.dontsHi : currentSituation.donts).map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-red-700">
                          <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Applicable Laws */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Scale className="h-5 w-5 text-gold" />
                    <h4 className="font-semibold text-foreground">{t.emergency.applicableLaws}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentSituation.laws.map((law, index) => (
                      <Badge key={index} variant="goldOutline" className="text-xs">
                        {law}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="destructive" 
                    size="lg"
                    onClick={() => window.location.href = `tel:${currentSituation.helpline.replace(/-/g, '')}`}
                  >
                    <Phone className="h-4 w-4" />
                    {t.emergency.call} {currentSituation.helpline}
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleAskAI}>
                    <Sparkles className="h-4 w-4" />
                    {t.emergency.askAIHelp}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmergencyHelp;
