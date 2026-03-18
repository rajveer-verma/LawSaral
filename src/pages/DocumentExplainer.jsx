import { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, File, Info, Loader2, X, CheckCircle, CircleCheck, Lightbulb, Sparkles } from "lucide-react";
import { useDocumentAnalysis } from "@/hooks/useDocumentAnalysis";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "@/hooks/use-toast";


// Parse the AI response into structured sections
const parseAnalysis = (text) => {
  const sections = {
    summary: "",
    keyPoints: [],
    importantThings: [],
    nextSteps: [],
    disclaimer: ""
  };

  const lines = text.split("\n");
  let currentSection = "";

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Detect section headers
    if (trimmedLine.toLowerCase().includes("what is this document about")) {
      currentSection = "summary";
      continue;
    } else if (trimmedLine.toLowerCase().includes("key points from the document")) {
      currentSection = "keyPoints";
      continue;
    } else if (trimmedLine.toLowerCase().includes("important things to know")) {
      currentSection = "importantThings";
      continue;
    } else if (trimmedLine.toLowerCase().includes("simple next steps")) {
      currentSection = "nextSteps";
      continue;
    } else if (trimmedLine.toLowerCase().includes("this explanation is for general understanding")) {
      sections.disclaimer = trimmedLine;
      continue;
    }

    // Add content to appropriate section
    if (trimmedLine) {
      if (currentSection === "summary") {
        sections.summary += (sections.summary ? " " : "") + trimmedLine;
      } else if (currentSection === "keyPoints" && (trimmedLine.startsWith("•") || trimmedLine.startsWith("-") || trimmedLine.startsWith("*"))) {
        sections.keyPoints.push(trimmedLine.replace(/^[•\-\*]\s*/, ""));
      } else if (currentSection === "importantThings" && (trimmedLine.startsWith("•") || trimmedLine.startsWith("-") || trimmedLine.startsWith("*"))) {
        sections.importantThings.push(trimmedLine.replace(/^[•\-\*]\s*/, ""));
      } else if (currentSection === "nextSteps" && (trimmedLine.startsWith("•") || trimmedLine.startsWith("-") || trimmedLine.startsWith("*"))) {
        sections.nextSteps.push(trimmedLine.replace(/^[•\-\*]\s*/, ""));
      }
    }
  }

  return sections;
};

const DocumentExplainer = () => {
  
  const [selectedDocType, setSelectedDocType] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { t } = useLanguage();
  
  const { analysis, isAnalyzing, analyzeDocument, clearAnalysis } = useDocumentAnalysis();

  const extractTextFromFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      if (file.type === "application/pdf") {
        reader.onload = () => {
          const text = reader.result;
          if (text && text.trim().length > 100) {
            resolve(text);
          } else {
            resolve(`[PDF document: ${file.name}. The document appears to be scanned or image-based. Please provide a general explanation of common legal documents of this type.]`);
          }
        };
        reader.onerror = () => reject(new Error("Failed to read PDF"));
        reader.readAsText(file);
      } else if (file.type.startsWith("image/")) {
        reader.onload = () => {
          const base64 = reader.result;
          resolve(`[IMAGE_BASE64:${base64}]`);
        };
        reader.onerror = () => reject(new Error("Failed to read image"));
        reader.readAsDataURL(file);
      } else {
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsText(file);
      }
    });
  };

  const handleFileSelect = async (file) => {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: t.common.error,
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type) && !file.name.endsWith(".txt")) {
      toast({
        title: t.common.error,
        description: "Please upload a PDF, TXT, JPG, or PNG file",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    clearAnalysis();

    try {
      const content = await extractTextFromFile(file);
      setFileContent(content);
    } catch (error) {
      console.error("Error reading file:", error);
      toast({
        title: t.common.error,
        description: "Could not read the file content",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleAnalyze = () => {
    if (!fileContent) {
      toast({
        title: t.common.error,
        description: "Please upload a document first",
        variant: "destructive",
      });
      return;
    }
    analyzeDocument(fileContent, selectedDocType || undefined);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setFileContent("");
    setSelectedDocType(null);
    clearAnalysis();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const parsedAnalysis = analysis ? parseAnalysis(analysis) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="goldOutline" className="mb-4">
              <FileText className="h-3 w-3 mr-1" />
              {t.document.badge}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.document.title}
            </h1>
            <p className="text-muted-foreground">
              {t.document.subtitle}
            </p>
          </div>

          {!analysis ? (
            <>
              {/* Document Types */}
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-3">{t.document.selectType}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {t.document.documentTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={selectedDocType === type ? "gold" : "outline"}
                      className="cursor-pointer bg-card hover:bg-secondary transition-colors"
                      onClick={() => setSelectedDocType(selectedDocType === type ? null : type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>


              {/* Upload Area */}
              <div
                className={`bg-white rounded-2xl border-2 border-dashed p-12 text-center transition-colors shadow-sm ${
                  isDragging
                    ? "border-gold bg-gold-light/10"
                    : uploadedFile
                    ? "border-green-500 bg-green-50/10"
                    : "border-border hover:border-gold"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {uploadedFile ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h2 className="font-display font-semibold text-xl text-foreground mb-1">
                        {t.document.fileUploaded}
                      </h2>
                      <p className="text-muted-foreground text-sm">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Button variant="gold" size="lg" onClick={handleAnalyze} disabled={isAnalyzing}>
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {t.document.analyzing}
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4" />
                            {t.document.analyze}
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="lg" onClick={handleReset}>
                        <X className="h-4 w-4" />
                        {t.document.remove}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-gold-light flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-8 w-8 text-gold-dark" />
                    </div>
                    <h2 className="font-display font-semibold text-xl text-foreground mb-2">
                      {t.document.uploadTitle}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {t.document.uploadSubtitle}
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.txt,.jpg,.jpeg,.png,.webp"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <Button variant="gold" size="lg" onClick={() => fileInputRef.current?.click()}>
                      <File className="h-4 w-4" />
                      {t.document.chooseFile}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      {t.document.supported}
                    </p>
                  </>
                )}
              </div>
            </>
          ) : (
            /* Analysis Result - Card-based design */
            <div className="space-y-4">
              {/* Summary Section */}
              <div className="bg-card rounded-xl shadow-sm border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-5 w-5 text-navy" />
                  <h2 className="font-display font-bold text-lg text-navy">
                    Summary — What is this document about?
                  </h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  {parsedAnalysis?.summary || (isAnalyzing ? "Analyzing document..." : "")}
                </p>
              </div>

              {/* Key Points Section */}
              {(parsedAnalysis?.keyPoints.length || 0) > 0 && (
                <div className="bg-card rounded-xl shadow-sm border border-border/50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CircleCheck className="h-5 w-5 text-navy" />
                    <h2 className="font-display font-bold text-lg text-navy">
                      Key Points from the Document
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {parsedAnalysis?.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-navy mt-1.5">•</span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Important Things to Know */}
              {(parsedAnalysis?.importantThings.length || 0) > 0 && (
                <div className="bg-card rounded-xl shadow-sm border border-border/50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="h-5 w-5 text-gold" />
                    <h2 className="font-display font-bold text-lg text-navy">
                      Important Things to Know
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {parsedAnalysis?.importantThings.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-navy mt-1.5">•</span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Simple Next Steps */}
              {(parsedAnalysis?.nextSteps.length || 0) > 0 && (
                <div className="bg-card rounded-xl shadow-sm border border-border/50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-5 w-5 text-navy" />
                    <h2 className="font-display font-bold text-lg text-navy">
                      Simple Next Steps
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {parsedAnalysis?.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-navy mt-1.5">•</span>
                        <span className="text-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Loading indicator */}
              {isAnalyzing && (
                <div className="flex items-center justify-center gap-2 text-gold py-4">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{t.document.analyzing}</span>
                </div>
              )}

              {/* Explain Another Document Button */}
              <div className="flex justify-center pt-4">
                <Button 
                  variant="gold" 
                  size="lg" 
                  onClick={handleReset}
                  className="gap-2 px-8"
                >
                  <Upload className="h-4 w-4" />
                  Explain Another Document
                </Button>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-center text-sm text-muted-foreground mt-8 italic">
            This explanation is for general understanding only.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentExplainer;
