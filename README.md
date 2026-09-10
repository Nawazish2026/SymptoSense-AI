# 🧠🏥 SymptoSense AI — Intelligent Health Symptom Analyzer

**SymptoSense AI** is an AI-powered healthcare web application that analyzes user-reported symptoms using **Generative AI + Retrieval-Augmented Generation (RAG)** to provide **safe, structured health insights**.

> ⚠️ This system provides informational guidance only and is **not a medical diagnosis tool**.

---

## 🚀 Project Overview

SymptoSense AI allows users to describe their symptoms and receive:

* Possible health conditions
* Severity level assessment
* Self-care recommendations
* Guidance on when to consult a doctor

The system combines **LLMs + medical knowledge retrieval** to ensure responses are grounded, structured, and safety-focused.

---

## ✨ Key Features

### 📝 Symptom Analysis

Users input:

* Symptoms (text description)
* Age group
* Gender
* Duration of symptoms

AI processes this data and returns structured medical insights.

### 🧠 Structured AI Output

Results are presented in clear UI cards:

1. **Possible Conditions** – Likely causes
2. **Severity Level** – Low / Medium / High
3. **Self-Care Recommendations** – Safe home-care tips
4. **When to See a Doctor** – Warning signs and escalation advice

### 📚 Retrieval-Augmented Generation (RAG)

Instead of relying only on a language model, the app:

* Retrieves medical knowledge from a vector database
* Uses that data as context
* Generates grounded, safer responses

### 📜 Past Analyses

Users can view previous symptom checks in a history section.

### ⚠️ Medical Safety

A visible disclaimer ensures responsible usage.

---

## 🛠 Tech Stack

### Frontend

* Next.js
* Tailwind CSS
* Responsive, modern medical UI
* Smooth animations & interactive cards

### Backend

* Node.js / FastAPI
* REST APIs for symptom analysis

### AI & Data Layer

* LLM API (OpenAI / Gemini / Claude)
* Vector Database (Pinecone / FAISS)
* Embeddings for medical knowledge retrieval

### Database

* MongoDB Atlas (User data + history)

---

## 🧩 System Architecture (High Level)

1. User submits symptoms
2. Backend processes request
3. Symptoms are embedded
4. Vector DB retrieves relevant medical documents
5. Context + symptoms sent to LLM
6. LLM generates structured response
7. Results displayed in UI

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/symptosense-ai.git
cd symptosense-ai
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
LLM_API_KEY=your_llm_api_key
VECTOR_DB_API_KEY=your_vector_db_key
JWT_SECRET=your_secret_key
```

### 4️⃣ Run Locally

```bash
npm run dev
```

Visit:
`http://localhost:3000`

---

## 🌍 Deployment

This project is fully compatible with **Vercel**.

### Steps:

1. Push code to GitHub
2. Import project into Vercel
3. Add environment variables in Vercel dashboard
4. Deploy 🚀

---

## 🔒 Security & Privacy

* Sensitive keys are excluded via `.gitignore`
* No medical diagnosis is stored as certified health data
* System is informational, not clinical

---

## ⚠️ Medical Disclaimer

SymptoSense AI does **not** provide medical diagnosis, treatment, or prescriptions. Always consult a qualified healthcare professional for medical concerns.
┌─────────────────────────────────────────────────────────────────────────────┐
│                            SYMPTOENSE AI ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────────────────┘
                              ┌──────────────┐
                              │    USER      │
                              │   BROWSER    │
                              └──────┬───────┘
                                     │ HTTPS
                                     ▼
                    ┌────────────────────────────────┐
                    │      FRONTEND (Next.js)        │
                    │  • React Components            │
                    │  • State Management            │
                    └────────────┬───────────────────┘
                                 │ POST /api/analyze
                                 ▼
                    ┌────────────────────────────────┐
                    │  BACKEND (Next.js API Routes)  │
                    │  • Validation & Routing        │
                    │  • RAG Pipeline Service        │
                    └────────┬───────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
    ┌─────────┐         ┌──────────┐      ┌──────────┐
    │ Gemini  │         │ Pinecone │      │  Gemini  │
    │   2.0   │         │ Vector   │      │  Flash   │
    │Embedding│         │   DB     │      │ Model    │
    └─────────┘         └──────────┘      └──────────┘
                             │ Returns JSON
                             ▼
                    ┌────────────────────────────────┐
                    │   MONGODB ATLAS DATABASE       │
                    │  • Asynchronous History Save   │
                    └────────────────────────────────┘
 Architectural Decisions: Why This Design is Better

RAG over Pure LLM (Reduced Hallucinations): Medical information requires strict accuracy. Instead of relying solely on an LLM's internal weights (which can hallucinate), I implemented a Retrieval-Augmented Generation (RAG) pipeline. By embedding the user's symptoms via Gemini 2.0 and querying a Pinecone Vector DB, the LLM is forced to ground its response in actual, retrieved medical literature.

Decoupled Client-Server Architecture in Next.js: By utilizing Next.js, I achieved a seamless integration of frontend React components and backend API routes. The edge-compatible API routes ensure fast execution, while the client-side rendering handles the dynamic Framer Motion UI without blocking the server.

Graceful Degradation (Resilience): The system is designed not to fail. If the Pinecone Vector DB goes down, the application catches the error and degrades gracefully, falling back to a direct Gemini LLM prompt or a mock "offline mode" response. The user never sees a raw 500 server crash.

Non-Blocking Database Operations: MongoDB Atlas is used for saving user history, but the database write operation is intentionally non-blocking. The API returns the AI results to the user immediately while the database saves the record asynchronously, ensuring zero latency penalty for the user.
                    

## 📬 Future Improvements

* Multilingual support
* Wearable data integration
* Symptom voice input
* Clinical-grade knowledge sources

