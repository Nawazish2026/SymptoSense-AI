"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SymptomInput from "@/components/SymptomInput";
import AIResults from "@/components/AIResults";
import Disclaimer from "@/components/Disclaimer";
import HowItWorks from "@/components/HowItWorks";
import TechStack from "@/components/TechStack";
import PastAnalyses from "@/components/PastAnalyses";

interface AnalysisResult {
  conditions: string[];
  severity: "Low" | "Medium" | "High";
  careFormatted: string[];
  doctorAdvice: string;
}

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (data: any) => {
    setIsAnalyzing(true);
    setResults(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const json = await response.json();

      // Map API response to UI format if needed, or use directly if matching
      // The API returns { success: true, daa: ... }  (Note: I noticed a typo 'daa' in my API route, I should fix it or map it)
      // Wait, let me double check the API route content I just wrote. 
      // I wrote `daa: aiResults`. I should probably fix that typo in the API route first or handle it here.
      // I will assume I will fix the API route typo in a separate step or just handle 'daa' here for now to be safe? 
      // No, better to fix the API route. But I can't look back easily. 
      // Let's assume standard response `data` and if I made a typo, I'll fix the API route file.

      // Let's check what I wrote in step 115... 
      // "return NextResponse.json({ success: true, daa: aiResults });" -> YES, TYRO 'daa'.

      // I will fix the API route typo first in a separate tool call, but for this file I will write the correct code anticipating 'data'.

      const resultData = json.data || json.daa; // Handle both just in case I don't fix it in time.

      const mappedResult: AnalysisResult = {
        conditions: resultData.possible_conditions,
        severity: resultData.severity_level,
        careFormatted: resultData.self_care_tips,
        doctorAdvice: resultData.doctor_visit_advice
      };

      setResults(mappedResult);

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <Hero />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none h-96 -z-10" />
        <SymptomInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      </div>

      <div className="container mx-auto px-4 pb-16">
        <Disclaimer />

        <div id="results" className="scroll-mt-24">
          {results && <AIResults results={results} />}
        </div>
      </div>

      <HowItWorks />

      <PastAnalyses />

      <TechStack />

      <footer className="bg-slate-900 py-12 text-slate-400 text-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© {new Date().getFullYear()} SymptoSense AI. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
