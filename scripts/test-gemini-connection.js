require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("API Key found:", apiKey ? "YES" : "NO");
  if (apiKey) {
    console.log("API Key starts with:", apiKey.substring(0, 5));
    console.log("API Key length:", apiKey.length);
    console.log("API Key last 5:", apiKey.substring(apiKey.length - 5));
  } else {
    console.log("Cannot proceed without API KEY");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = "gemini-flash-latest";

  try {
    console.log(`Testing model: ${modelName}...`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello, are you online?");
    console.log("Response received:", result.response.text());
    console.log("SUCCESS: Gemini is working.");
  } catch (error) {
    console.error("ERROR: Failed to connect to Gemini.");
    console.error(error.message);
  }
}

testGemini();
