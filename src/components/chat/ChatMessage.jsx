import { Scale, User } from "lucide-react";
import { cn } from "@/lib/utils";

function cleanMarkdown(text) {
  return text
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/^[\-\*]\s+/gm, "• ")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .trim();
}

export function ChatMessage({ role, content }) {
  const isAssistant = role === "assistant";
  const displayContent = isAssistant ? cleanMarkdown(content) : content;

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-xl",
        isAssistant ? "bg-secondary/50" : "bg-gold-light/30"
      )}
    >
      <div
        className={cn(
          "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          isAssistant ? "bg-navy text-white" : "bg-gold text-white"
        )}
      >
        {isAssistant ? (
          <Scale className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground mb-1">
          {isAssistant ? "LawSaral AI" : "You"}
        </p>
        <div className="text-sm text-foreground whitespace-pre-wrap break-words leading-relaxed">
          {displayContent}
        </div>
      </div>
    </div>
  );
}
