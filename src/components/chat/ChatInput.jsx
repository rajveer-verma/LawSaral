import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

export function ChatInput({ onSend, isLoading, placeholder = "Ask your legal question..." }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 transition-all">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground disabled:opacity-50"
      />
      <Button
        variant="gold"
        size="icon"
        className="rounded-full shrink-0"
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
