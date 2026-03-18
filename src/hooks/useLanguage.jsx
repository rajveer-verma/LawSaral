import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    nav: {
      home: "Home",
      askAI: "Ask AI",
      emergencyHelp: "Emergency Help",
      documentExplainer: "Document Explainer",
      mythBuster: "Myth Buster",
      stateLaws: "State Laws",
      login: "Login",
      logout: "Logout",
      profile: "Profile",
    },
    hero: {
      title1: "Understand Indian Laws in",
      title2: "Simple Language",
      subtitle: "Get clear answers to legal questions. Understand any document. Know your rights.",
      askAI: "Ask AI",
      uploadDocument: "Upload Document",
    },
    services: {
      heading: "How Can We Help?",
      subheading: "Choose what you need help with today.",
      askAI: { title: "Ask AI", description: "Get simple answers to your legal questions" },
      documentExplainer: { title: "Document Explainer", description: "Upload and understand any legal document" },
      emergencyHelp: { title: "Emergency Help", description: "Urgent legal guidance when you need it" },
      mythBuster: { title: "Myth Buster", description: "Debunk common legal misconceptions with facts and proper legal context." },
      stateLaws: { title: "State Laws", description: "Get state-specific legal information for your region" },
    },
    askAI: {
      title: "LawSaral AI",
      subtitle: "Your legal assistant for Indian laws",
      placeholder: "Ask any question about Indian laws, your rights, or legal procedures",
      newChat: "New Chat",
      send: "Send",
      disclaimer: "For educational purposes only. Consult a qualified lawyer for specific legal advice.",
      suggestedQuestions: [
        "What are my rights if police stop me?",
        "Can my landlord evict me without notice?",
        "What should I do if my employer doesn't pay salary?",
        "How can I file a consumer complaint?",
      ],
      askPlaceholder: "Ask your legal question...",
    },
    emergency: {
      badge: "Emergency Legal Guidance",
      title: "Immediate Legal Help",
      subtitle: "Quick access to essential legal information and steps for emergency situations. Stay calm and follow these guidelines.",
      selectSituation: "Select Situation",
      helpline: "Helpline",
      immediateSteps: "Immediate Steps",
      dos: "Do's",
      donts: "Don'ts",
      applicableLaws: "Applicable Laws",
      call: "Call",
      askAIHelp: "Ask AI for More Help",
      situations: {
        arrest: { label: "Police Detention / Arrest", description: "Know your rights when stopped, questioned, or arrested" },
        domestic: { label: "Domestic Violence" },
        accident: { label: "Road Accident" },
        workplace: { label: "Workplace Harassment" },
      },
      arrestSteps: [
        "Stay calm and be polite",
        "Ask for the reason of detention",
        "You have the right to remain silent",
        "Request to call a lawyer or family member",
        "Do not sign any blank papers",
        "Note down badge numbers of officers",
      ],
      dosList: [
        "Ask for arrest warrant (for non-cognizable offences)",
        "Inform a family member immediately",
        "Remember officer details",
        "Request female officer if you're a woman",
      ],
      dontsList: [
        "Do not resist arrest physically",
        "Do not make confessions without lawyer",
        "Do not sign anything without reading",
        "Do not offer bribes",
      ],
    },
    document: {
      badge: "Document Helper",
      title: "Document Explainer",
      subtitle: "Upload any document and we'll explain it to you in simple, easy-to-understand language.",
      selectType: "Select document type (optional):",
      selectState: "Select State",
      stateNote: "State rules may vary. This is for general awareness only.",
      uploadTitle: "Upload Your Document",
      uploadSubtitle: "Drag and drop your file here, or click to browse",
      chooseFile: "Choose File",
      supported: "Supported: PDF, TXT, JPG, PNG (Max 10MB)",
      fileUploaded: "File Uploaded",
      analyze: "Analyze Document",
      analyzing: "Analyzing...",
      remove: "Remove",
      analyzeAnother: "Analyze Another",
      disclaimer: "This explanation is for general understanding only.",
      documentTypes: [
        "Rent Agreement",
        "Offer Letter",
        "FIR / Complaint",
        "Terms & Conditions",
        "Loan Papers",
        "Insurance Policy",
        "Legal Notice",
        "Property Documents",
      ],
    },
    myths: {
      badge: "Legal Myth Buster",
      title: "Debunking Common Legal Myths",
      subtitle: "Don't believe everything you hear about Indian laws. Learn the truth behind common misconceptions.",
      searchPlaceholder: "Search myths...",
      revealTruth: "Click to reveal truth",
      categories: [
        "All",
        "Police & Arrest",
        "Women's Rights",
        "Property Rights",
        "Contracts",
        "Financial",
        "FIR & Police",
        "Intellectual Property",
      ],
    },
    stateLaws: {
      badge: "State-Specific Laws",
      title: "State Laws Guide",
      subtitle: "Get legal information tailored to your Indian state. Rules can vary by region.",
      selectState: "Select Your State",
      selectStatePrompt: "Select a state to see notable local laws",
      whyMatters: "Why do state laws matter?",
      whyMattersDesc: "Many laws in India vary by state, including rent rules, property registration, stamp duty, and local labor laws. Selecting your state helps you get more accurate information.",
      askCustom: "Ask a Custom Question",
    },
    footer: {
      disclaimer: "For legal awareness only. Not legal advice.",
      quickLinks: "Quick Links",
      contact: "Contact",
      brandDescription: "Making Indian laws accessible to everyone. Understand your rights in simple language.",
      importantDisclaimer: "Important Disclaimer:",
      disclaimerText: "LawSaral provides legal information for educational purposes only. This is NOT legal advice. For specific legal matters, please consult a qualified lawyer.",
      copyright: "© 2026 LawSaral. All rights reserved.",
    },
    auth: {
      welcomeBack: "Welcome Back",
      createAccount: "Create Account",
      displayName: "Display Name",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      signUp: "Sign Up",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      signInPrompt: "Sign in to save your chat history",
    },
    common: {
      all: "All",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      myth: "MYTH",
    },
  },
  hi: {
    nav: {
      home: "होम",
      askAI: "AI से पूछें",
      emergencyHelp: "आपातकालीन मदद",
      documentExplainer: "दस्तावेज़ व्याख्याकार",
      mythBuster: "मिथक तोड़क",
      stateLaws: "राज्य कानून",
      login: "लॉगिन",
      logout: "लॉगआउट",
      profile: "प्रोफ़ाइल",
    },
    hero: {
      title1: "भारतीय कानूनों को समझें",
      title2: "सरल भाषा में",
      subtitle: "कानूनी सवालों के स्पष्ट जवाब पाएं। किसी भी दस्तावेज़ को समझें। अपने अधिकार जानें।",
      askAI: "AI से पूछें",
      uploadDocument: "दस्तावेज़ अपलोड करें",
    },
    services: {
      heading: "हम कैसे मदद कर सकते हैं?",
      subheading: "आज आपको किस मदद की ज़रूरत है, चुनें।",
      askAI: { title: "AI से पूछें", description: "अपने कानूनी सवालों के सरल जवाब पाएं" },
      documentExplainer: { title: "दस्तावेज़ व्याख्याकार", description: "किसी भी कानूनी दस्तावेज़ को अपलोड करें और समझें" },
      emergencyHelp: { title: "आपातकालीन मदद", description: "जब ज़रूरत हो तब तत्काल कानूनी मार्गदर्शन" },
      mythBuster: { title: "मिथक तोड़क", description: "तथ्यों और उचित कानूनी संदर्भ के साथ सामान्य कानूनी भ्रांतियों का खंडन करें।" },
      stateLaws: { title: "राज्य कानून", description: "अपने क्षेत्र के लिए राज्य-विशिष्ट कानूनी जानकारी प्राप्त करें" },
    },
    askAI: {
      title: "LawSaral AI",
      subtitle: "भारतीय कानूनों के लिए आपका कानूनी सहायक",
      placeholder: "भारतीय कानूनों, अपने अधिकारों, या कानूनी प्रक्रियाओं के बारे में कोई भी प्रश्न पूछें",
      newChat: "नई चैट",
      send: "भेजें",
      disclaimer: "केवल शैक्षिक उद्देश्यों के लिए। विशिष्ट कानूनी सलाह के लिए योग्य वकील से परामर्श लें।",
      suggestedQuestions: [
        "पुलिस मुझे रोके तो मेरे क्या अधिकार हैं?",
        "क्या मेरा मकान मालिक बिना नोटिस के मुझे निकाल सकता है?",
        "अगर मेरा नियोक्ता वेतन नहीं देता तो मुझे क्या करना चाहिए?",
        "मैं उपभोक्ता शिकायत कैसे दर्ज कर सकता हूं?",
      ],
      askPlaceholder: "अपना कानूनी प्रश्न पूछें...",
    },
    emergency: {
      badge: "आपातकालीन कानूनी मार्गदर्शन",
      title: "तत्काल कानूनी मदद",
      subtitle: "आपातकालीन स्थितियों के लिए आवश्यक कानूनी जानकारी और कदमों तक त्वरित पहुंच। शांत रहें और इन दिशानिर्देशों का पालन करें।",
      selectSituation: "स्थिति चुनें",
      helpline: "हेल्पलाइन",
      immediateSteps: "तत्काल कदम",
      dos: "करें",
      donts: "न करें",
      applicableLaws: "लागू कानून",
      call: "कॉल करें",
      askAIHelp: "अधिक मदद के लिए AI से पूछें",
      situations: {
        arrest: { label: "पुलिस हिरासत / गिरफ्तारी", description: "रोके जाने, पूछताछ, या गिरफ्तारी पर अपने अधिकार जानें" },
        domestic: { label: "घरेलू हिंसा" },
        accident: { label: "सड़क दुर्घटना" },
        workplace: { label: "कार्यस्थल उत्पीड़न" },
      },
      arrestSteps: [
        "शांत रहें और विनम्र रहें",
        "हिरासत का कारण पूछें",
        "आपको चुप रहने का अधिकार है",
        "वकील या परिवार के सदस्य को कॉल करने का अनुरोध करें",
        "किसी भी खाली कागज पर हस्ताक्षर न करें",
        "अधिकारियों के बैज नंबर नोट करें",
      ],
      dosList: [
        "गिरफ्तारी वारंट मांगें (गैर-संज्ञेय अपराधों के लिए)",
        "तुरंत परिवार के सदस्य को सूचित करें",
        "अधिकारी का विवरण याद रखें",
        "यदि आप महिला हैं तो महिला अधिकारी का अनुरोध करें",
      ],
      dontsList: [
        "शारीरिक रूप से गिरफ्तारी का विरोध न करें",
        "वकील के बिना कोई स्वीकारोक्ति न करें",
        "बिना पढ़े किसी चीज़ पर हस्ताक्षर न करें",
        "रिश्वत न दें",
      ],
    },
    document: {
      badge: "दस्तावेज़ सहायक",
      title: "दस्तावेज़ व्याख्याकार",
      subtitle: "कोई भी दस्तावेज़ अपलोड करें और हम इसे सरल, आसान भाषा में समझाएंगे।",
      selectType: "दस्तावेज़ प्रकार चुनें (वैकल्पिक):",
      selectState: "राज्य चुनें",
      stateNote: "राज्य के नियम भिन्न हो सकते हैं। यह केवल सामान्य जागरूकता के लिए है।",
      uploadTitle: "अपना दस्तावेज़ अपलोड करें",
      uploadSubtitle: "अपनी फ़ाइल यहाँ खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें",
      chooseFile: "फ़ाइल चुनें",
      supported: "समर्थित: PDF, TXT, JPG, PNG (अधिकतम 10MB)",
      fileUploaded: "फ़ाइल अपलोड हो गई",
      analyze: "दस्तावेज़ का विश्लेषण करें",
      analyzing: "विश्लेषण हो रहा है...",
      remove: "हटाएं",
      analyzeAnother: "एक और विश्लेषण करें",
      disclaimer: "यह व्याख्या केवल सामान्य समझ के लिए है।",
      documentTypes: [
        "किराया अनुबंध",
        "ऑफर लेटर",
        "FIR / शिकायत",
        "नियम और शर्तें",
        "ऋण कागजात",
        "बीमा पॉलिसी",
        "कानूनी नोटिस",
        "संपत्ति दस्तावेज़",
      ],
    },
    myths: {
      badge: "कानूनी मिथक तोड़क",
      title: "सामान्य कानूनी मिथकों का खंडन",
      subtitle: "भारतीय कानूनों के बारे में जो सुनते हैं उस पर विश्वास न करें। सामान्य भ्रांतियों के पीछे का सच जानें।",
      searchPlaceholder: "मिथक खोजें...",
      revealTruth: "सच देखने के लिए क्लिक करें",
      categories: [
        "सभी",
        "पुलिस और गिरफ्तारी",
        "महिला अधिकार",
        "संपत्ति अधिकार",
        "अनुबंध",
        "वित्तीय",
        "FIR और पुलिस",
        "बौद्धिक संपदा",
      ],
    },
    stateLaws: {
      badge: "राज्य-विशिष्ट कानून",
      title: "राज्य कानून गाइड",
      subtitle: "अपने भारतीय राज्य के अनुसार कानूनी जानकारी प्राप्त करें। नियम क्षेत्र के अनुसार भिन्न हो सकते हैं।",
      selectState: "अपना राज्य चुनें",
      selectStatePrompt: "उल्लेखनीय स्थानीय कानून देखने के लिए राज्य चुनें",
      whyMatters: "राज्य कानून क्यों महत्वपूर्ण हैं?",
      whyMattersDesc: "भारत में कई कानून राज्य के अनुसार भिन्न होते हैं, जिसमें किराया नियम, संपत्ति पंजीकरण, स्टांप ड्यूटी और स्थानीय श्रम कानून शामिल हैं। अपना राज्य चुनने से आपको अधिक सटीक जानकारी मिलती है।",
      askCustom: "कस्टम प्रश्न पूछें",
    },
    footer: {
      disclaimer: "केवल कानूनी जागरूकता के लिए। कानूनी सलाह नहीं।",
      quickLinks: "त्वरित लिंक",
      contact: "संपर्क",
      brandDescription: "भारतीय कानूनों को सभी के लिए सुलभ बनाना। सरल भाषा में अपने अधिकार समझें।",
      importantDisclaimer: "महत्वपूर्ण अस्वीकरण:",
      disclaimerText: "LawSaral केवल शैक्षिक उद्देश्यों के लिए कानूनी जानकारी प्रदान करता है। यह कानूनी सलाह नहीं है। विशिष्ट कानूनी मामलों के लिए, कृपया योग्य वकील से परामर्श लें।",
      copyright: "© 2026 LawSaral. सर्वाधिकार सुरक्षित।",
    },
    auth: {
      welcomeBack: "वापस स्वागत है",
      createAccount: "खाता बनाएं",
      displayName: "प्रदर्शन नाम",
      email: "ईमेल",
      password: "पासवर्ड",
      signIn: "साइन इन करें",
      signUp: "साइन अप करें",
      noAccount: "खाता नहीं है?",
      hasAccount: "पहले से खाता है?",
      signInPrompt: "अपनी चैट इतिहास सहेजने के लिए साइन इन करें",
    },
    common: {
      all: "सभी",
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफल",
      myth: "मिथक",
    },
  },
};

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lawsaral-language");
    if (saved === "hi" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lawsaral-language", lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
