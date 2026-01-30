import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
export const geminiModel = genAI ? genAI.getGenerativeModel({ model: "gemini-flash-latest" }) : null;
export const geminiEmbeddingModel = genAI ? genAI.getGenerativeModel({ model: "text-embedding-004" }) : null;
