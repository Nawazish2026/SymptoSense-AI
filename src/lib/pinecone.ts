import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

export const pinecone = apiKey ? new Pinecone({ apiKey }) : null;
