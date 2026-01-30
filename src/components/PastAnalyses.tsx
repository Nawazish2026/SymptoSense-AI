"use client";

import { useEffect, useState } from "react";
import { Clock, ChevronRight, Loader2 } from "lucide-react";

interface HistoryItem {
  userInput: string;
  age?: string;
  gender?: string;
  duration?: string;
  aiResponse: {
    severity_level: "Low" | "Medium" | "High";
    possible_conditions?: string[];
    self_care_tips?: string[];
    doctor_visit_advice?: string;
  };
  createdAt: string;
}

export default function PastAnalyses() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<HistoryItem | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/history");
        if (res.ok) {
          const data = await res.json();
          setHistory(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <section id="previous" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
        </div>
      </section>
    );
  }

  if (history.length === 0) {
    return null;
  }

  const severityColors = {
    Low: "text-green-600 bg-green-50",
    Medium: "text-yellow-600 bg-yellow-50",
    High: "text-red-600 bg-red-50",
  };

  return (
    <section id="previous" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Recent Analyses</h2>
          {/* <button className="text-blue-600 text-sm font-medium hover:underline">View All</button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {history.map((item, idx) => {
            const severity = item.aiResponse?.severity_level || "Low";
            const colorClass = severityColors[severity] || severityColors.Low;

            // Format date roughly
            const date = new Date(item.createdAt).toLocaleDateString();

            return (
              <div
                key={idx}
                onClick={() => setSelectedAnalysis(item)}
                className="group border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${colorClass}`}>
                    {severity} Risk
                  </div>
                  <div className="text-slate-400 text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {date}
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 truncate" title={item.userInput}>
                  {item.userInput}
                </h3>
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  View Report <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis Details Modal */}
      {selectedAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAnalysis(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-slate-900">Health Report</h3>
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Profile */}
              <div className="bg-slate-50 p-4 rounded-lg text-sm grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-slate-500">Age</span>
                  <span className="font-semibold">{selectedAnalysis.age || "N/A"}</span>
                </div>
                <div>
                  <span className="block text-slate-500">Gender</span>
                  <span className="font-semibold">{selectedAnalysis.gender || "N/A"}</span>
                </div>
                <div>
                  <span className="block text-slate-500">Duration</span>
                  <span className="font-semibold">{selectedAnalysis.duration || "N/A"}</span>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Symptoms Reported</h4>
                <p className="text-slate-600">{selectedAnalysis.userInput}</p>
              </div>

              <hr className="border-slate-100" />

              {/* AI Analysis */}
              {selectedAnalysis.aiResponse && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Conditions */}
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                        Possible Conditions
                      </h4>
                      <ul className="space-y-1">
                        {selectedAnalysis.aiResponse.possible_conditions?.map((c, i) => (
                          <li key={i} className="text-blue-700 bg-blue-50 px-3 py-2 rounded-lg text-sm">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Self Care */}
                    <div>
                      <h4 className="text-sm font-semibold text-green-900 mb-2">Home Care</h4>
                      <ul className="space-y-1">
                        {selectedAnalysis.aiResponse.self_care_tips?.map((tip, i) => (
                          <li key={i} className="text-slate-600 text-sm flex items-start">
                            <span className="mr-2 text-green-500">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Doctor Advice */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Medical Recommendation</h4>
                    <p className="text-blue-800 text-sm">
                      {selectedAnalysis.aiResponse.doctor_visit_advice}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
