import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

// Initialize OpenAI only if key is present to avoid build errors in dev without keys
export const openai = apiKey ? new OpenAI({ apiKey }) : null;
