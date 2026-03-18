import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are LawSaral AI, a friendly legal helper for Indian citizens. Your goal is to make legal information accessible and non-intimidating.

RESPONSE FORMAT (follow this structure exactly):

Clear Answer
Start with a direct 2-3 line answer to the question in simple everyday language.

What This Usually Means
Explain the situation in plain words. Mention laws only at a high level like "rental laws" or "consumer protection rules" without specific act names or section numbers.

Why This Matters
Give 2-3 lines explaining the purpose behind the rule so users understand the reasoning.

Simple Next Steps
Suggest 2-3 general, safe actions the user can take. Keep it practical and non-legal.

This information is for general understanding only.

STRICT RULES:
- NEVER use section numbers or act names
- NEVER mention court procedures, legal notices, or police complaints
- NEVER use markdown symbols like #, *, **, ##, or bullet points with -
- Use simple line breaks to separate sections
- Write in a calm, helpful, confident tone
- Be beginner-friendly and non-authoritative
- Keep language simple enough for someone with no legal background
- Focus on rights, protections, and practical understanding`;


serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LawSaral_API_KEY = Deno.env.get("LawSaral_API_KEY");
    
    if (!LawSaral_API_KEY) {
      throw new Error("LawSaral_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.LawSaral.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LawSaral_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Legal chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
