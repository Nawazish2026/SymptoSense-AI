import { genAI } from "@/lib/gemini";
import { pinecone } from "@/lib/pinecone";

interface RAGInput {
  symptoms: string;
  age: string;
  gender: string;
  duration: string;
}

interface RAGOutput {
  possible_conditions: string[];
  severity_level: "Low" | "Medium" | "High";
  self_care_tips: string[];
  doctor_visit_advice: string;
  context_used?: string[];
}

export async function runRAGPipeline(input: RAGInput): Promise<RAGOutput> {
  const { symptoms, age, gender, duration } = input;

  // 1. EMBEDDING STEP
  let symptomEmbedding: number[] = [];
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
      const embeddingResponse = await model.embedContent(symptoms);
      symptomEmbedding = embeddingResponse.embedding.values;
    } catch (e) {
      console.warn("Gemini Embedding failed:", e);
    }
  }

  // 2. RETRIEVAL STEP
  let retrievedContext = "";
  const contextSources: string[] = [];

  if (pinecone && symptomEmbedding.length > 0) {
    try {
      const index = pinecone.Index("medical-kb");
      const queryResponse = await index.query({
        vector: symptomEmbedding,
        topK: 3,
        includeMetadata: true
      });

      if (queryResponse.matches.length > 0) {
        retrievedContext = queryResponse.matches
          .map(match => match.metadata?.text || "")
          .join("\n\n");
        contextSources.push("Medical Knowledge Base (RAG)");
      }
    } catch (e) {
      console.warn("Pinecone retrieval failed:", e);
    }
  }

  if (!retrievedContext) {
    contextSources.push("AI Internal Medical Knowledge");
  }

  // 3. GENERATION STEP
  const systemPrompt = `
You are a medical assistant AI (SymptoSense).
Analyze the user's symptoms based on the provided context (if any) or your general medical knowledge.
Do NOT provide a diagnosis. Provide "Possible Conditions" only.
Return structured output in JSON format ONLY. Do not include markdown code blocks.
Structure:
{
  "possible_conditions": ["condition1", "condition2"],
  "severity_level": "Low" | "Medium" | "High",
  "self_care_tips": ["tip1", "tip2"],
  "doctor_visit_advice": "advice string"
}

Symptoms:
${symptoms}
Patient Profile: Age ${age}, Gender ${gender}, Duration ${duration}

Medical Context (can be empty):
${retrievedContext}
`;

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-flash-latest",
        generationConfig: { responseMimeType: "application/json" }
      });

      const result = await model.generateContent(systemPrompt);
      const content = result.response.text();

      if (content) {
        const parsed = JSON.parse(content) as RAGOutput;
        return {
          ...parsed,
          context_used: contextSources
        };
      }
    } catch (e) {
      console.error("Gemini Generation failed detailed error:", JSON.stringify(e, null, 2));
      console.error("Gemini Generation failed message:", e instanceof Error ? e.message : String(e));
    }
  }

  // 4. MOCK FALLBACK
  console.log("Using Mock AI Response (Offline/Error Mode)");
  return {
    possible_conditions: ["Service Unavailable - Check API Keys"],
    severity_level: "Low",
    self_care_tips: ["Please ensure GEMINI_API_KEY is set in .env.local"],
    doctor_visit_advice: "System is running in offline mode.",
    context_used: ["Mock Fallback"]
  };
}
