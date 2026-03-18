import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a friendly document helper for Indian citizens. Your goal is to explain documents in simple, beginner-friendly language like ChatGPT would.

RESPONSE FORMAT (follow this exact structure):

What is this document about?
Write 2-3 simple sentences explaining what this document appears to be. Use cautious wording like "This document appears to be..." instead of absolute statements. Explain what it is and why it was written. No legal jargon.

Key Points from the Document
Use clean bullet points with these labels:
• Person(s) mentioned: [names if visible]
• Date(s) mentioned: [dates if visible]
• Place(s) mentioned: [locations if visible]
• Main purpose: [what the document aims to do]
• Important request or statement: [key ask or claim]
Keep facts only. No assumptions. If something is unclear, rephrase it in simple clear language instead of quoting broken sentences.

Important Things to Know
Explain in very simple language:
• Why people usually create this type of document
• Where it is generally submitted
• Why people keep a copy
This is educational, not legal.

Simple Next Steps
Provide 2-3 generic, non-legal steps:
• Keep a copy of this document safely
• Authorities or relevant parties may review it
• It may be useful for future reference

This explanation is for general understanding only.

STRICT RULES:
- NEVER mention laws, acts, sections, or legal procedures
- NEVER show warnings, red flags, or risk analysis
- NEVER use words like FIR, lawyer, legal action, court
- NEVER guess beyond what is visible in the document
- NEVER quote grammatically incorrect sentences directly - rephrase them clearly
- Use calm, friendly, beginner-focused tone
- Keep sentences short and easy to scan
- Do not use markdown symbols like #, *, ** - use plain text with bullet points (•)`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentText, documentType, state } = await req.json();
    
    if (!documentText) {
      return new Response(JSON.stringify({ error: "No document text provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LawSaral_API_KEY = Deno.env.get("LawSaral_API_KEY");
    if (!LawSaral_API_KEY) {
      throw new Error("LawSaral_API_KEY is not configured");
    }

    // Check if this is an image (base64 encoded)
    const isImage = documentText.startsWith("[IMAGE_BASE64:");
    
    let messages: any[];
    
    if (isImage) {
      // Extract base64 data
      const base64Data = documentText.replace("[IMAGE_BASE64:", "").replace("]", "");
      
      messages = [
        { role: "system", content: SYSTEM_PROMPT },
        { 
          role: "user", 
          content: [
            {
              type: "text",
              text: `Please analyze this ${documentType || "legal"} document image${state ? ` (considering ${state} state context where applicable)` : ""}. Read all text visible in the image and provide a complete analysis following the output format.`
            },
            {
              type: "image_url",
              image_url: {
                url: base64Data
              }
            }
          ]
        }
      ];
    } else {
      // Text-based document
      const userMessage = `Please analyze this ${documentType || "legal"} document${state ? ` (considering ${state} state context where applicable)` : ""}:

---
${documentText}
---

Provide a complete analysis following the output format.`;

      messages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ];
    }

    const response = await fetch("https://ai.gateway.LawSaral.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LawSaral_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
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
      return new Response(JSON.stringify({ error: "Failed to analyze document" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Document analysis error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
