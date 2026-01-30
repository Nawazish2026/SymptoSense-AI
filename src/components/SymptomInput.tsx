"use client";

import { useState } from "react";
import { Search, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SymptomInputProps {
  onAnalyze: (data: any) => void;
  isAnalyzing: boolean;
}

export default function SymptomInput({ onAnalyze, isAnalyzing }: SymptomInputProps) {
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [duration, setDuration] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    // Simulate data collection
    onAnalyze({ description, age, gender, duration });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      id="analyze"
      className="w-full max-w-4xl mx-auto -mt-10 lg:-mt-20 relative z-10 px-4"
    >
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/50 overflow-hidden ring-1 ring-slate-900/5 transition-colors duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-200" />
            Symptom Checker
          </h2>
          <span className="text-blue-100 text-xs font-medium bg-white/20 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
            Powered by Gemini 2.0
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          <div className="space-y-3">
            <label htmlFor="symptoms" className="block text-sm font-semibold text-slate-700">
              Describe your symptoms
            </label>
            <div className={`relative transition-all duration-300 rounded-xl p-1 bg-gradient-to-br ${focusedField === 'symptoms' ? 'from-blue-400 to-indigo-400' : 'from-slate-200 to-slate-200'}`}>
              <textarea
                id="symptoms"
                rows={4}
                onFocus={() => setFocusedField('symptoms')}
                onBlur={() => setFocusedField(null)}
                className="w-full rounded-lg border-none bg-white p-4 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-base resize-none shadow-inner transition-colors"
                placeholder="e.g. I have a throbbing headache on the left side, sensitivity to light, and mild nausea since this morning."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <p className="text-xs text-slate-400 pl-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Be as specific as possible for better accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-semibold text-slate-700">
                Age Group
              </label>
              <div className={`relative transition-all duration-300 rounded-xl p-[2px] bg-gradient-to-br ${focusedField === 'age' ? 'from-blue-400 to-indigo-400' : 'from-slate-200 to-slate-200'}`}>
                <select
                  id="age"
                  onFocus={() => setFocusedField('age')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full appearance-none rounded-[10px] border-none bg-white p-3 pr-8 text-slate-900 focus:ring-0 cursor-pointer shadow-sm transition-colors"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Age</option>
                  <option value="infant">Infant (0-2 yrs)</option>
                  <option value="child">Child (3-12 yrs)</option>
                  <option value="teen">Teenager (13-19 yrs)</option>
                  <option value="adult">Adult (20-59 yrs)</option>
                  <option value="senior">Senior (60+ yrs)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-semibold text-slate-700">
                Gender
              </label>
              <div className={`relative transition-all duration-300 rounded-xl p-[2px] bg-gradient-to-br ${focusedField === 'gender' ? 'from-blue-400 to-indigo-400' : 'from-slate-200 to-slate-200'}`}>
                <select
                  id="gender"
                  onFocus={() => setFocusedField('gender')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full appearance-none rounded-[10px] border-none bg-white p-3 pr-8 text-slate-900 focus:ring-0 cursor-pointer shadow-sm transition-colors"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other/Prefer not to say</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="duration" className="block text-sm font-semibold text-slate-700">
                Duration
              </label>
              <div className={`relative transition-all duration-300 rounded-xl p-[2px] bg-gradient-to-br ${focusedField === 'duration' ? 'from-blue-400 to-indigo-400' : 'from-slate-200 to-slate-200'}`}>
                <select
                  id="duration"
                  onFocus={() => setFocusedField('duration')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full appearance-none rounded-[10px] border-none bg-white p-3 pr-8 text-slate-900 focus:ring-0 cursor-pointer shadow-sm transition-colors"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                >
                  <option value="" disabled>How long?</option>
                  <option value="hours">Less than 24 hours</option>
                  <option value="days">1-3 days</option>
                  <option value="week">A week or more</option>
                  <option value="chronic">Chronic (Months+)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isAnalyzing || !description}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] hover:shadow-blue-500/40 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  Analyze with AI
                  <Search className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                </>
              )}
            </button>
            <p className="mt-4 text-center text-xs text-slate-400 max-w-lg mx-auto">
              By clicking Analyze, you agree that this information is for educational purposes only and does not constitute medical advice.
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
