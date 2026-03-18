import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Scale, Lightbulb, RotateCcw } from "lucide-react";
import { useLegalChat } from "@/hooks/useLegalChat";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useLanguage } from "@/hooks/useLanguage";

const AskAI = () => {
  const { messages, isLoading, sendMessage, clearChat } = useLegalChat();
  const messagesEndRef = useRef(null);
  const { t } = useLanguage();
  const location = useLocation();
  const prefillHandled = useRef(false);

  // Handle pre-filled question from navigation (e.g., from State Laws page)
  useEffect(() => {
    const state = location.state;
    if (state?.prefillQuestion && !prefillHandled.current && messages.length === 0) {
      prefillHandled.current = true;
      sendMessage(state.prefillQuestion);
      // Clear the state to prevent re-sending on re-render
      window.history.replaceState({}, document.title);
    }
  }, [location.state, sendMessage, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-6 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border border-border shadow-lg flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
              {/* Header */}
              <div className="p-4 lg:p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gold-light flex items-center justify-center">
                    <Scale className="h-5 w-5 lg:h-6 lg:w-6 text-gold-dark" />
                  </div>
                  <div>
                    <h1 className="font-display text-lg lg:text-xl font-bold text-foreground">
                      {t.askAI.title}
                    </h1>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      {t.askAI.subtitle}
                    </p>
                  </div>
                </div>
                {hasMessages && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearChat}
                    className="gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="hidden sm:inline">{t.askAI.newChat}</span>
                  </Button>
                )}
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
                {!hasMessages ? (
                  <>
                    <div className="text-center py-6 lg:py-8">
                      <p className="text-muted-foreground mb-4 lg:mb-6">
                        {t.askAI.placeholder}
                      </p>
                    </div>
                    {/* Suggested Questions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {t.askAI.suggestedQuestions.map((q, index) => (
                        <button
                          key={index}
                          onClick={() => sendMessage(q)}
                          disabled={isLoading}
                          className="flex items-start gap-3 p-3 lg:p-4 rounded-xl border border-border bg-secondary/50 hover:bg-secondary transition-colors text-left group disabled:opacity-50"
                        >
                          <Lightbulb className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                          <span className="text-xs lg:text-sm text-foreground group-hover:text-navy transition-colors">
                            {q}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <ChatMessage key={index} role={msg.role} content={msg.content} />
                    ))}
                    {isLoading && messages[messages.length - 1]?.role === "user" && (
                      <div className="flex gap-3 p-4 rounded-xl bg-secondary/50">
                        <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-navy text-white">
                          <Scale className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            {t.askAI.title}
                          </p>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 lg:p-6 border-t border-border">
                <ChatInput onSend={sendMessage} isLoading={isLoading} />
                <p className="text-xs text-muted-foreground text-center mt-3">
                  {t.askAI.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AskAI;
