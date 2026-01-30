import { AlertCircle, CheckCircle2, Thermometer, UserPlus, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface AIResultsProps {
  results: {
    conditions: string[];
    severity: "Low" | "Medium" | "High";
    careFormatted: string[];
    doctorAdvice: string;
  } | null;
}

export default function AIResults({ results }: AIResultsProps) {
  if (!results) return null;

  const severityColors = {
    Low: "bg-green-50 text-green-700 border-green-200 ring-green-100",
    Medium: "bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-100",
    High: "bg-red-50 text-red-700 border-red-200 ring-red-100",
  };

  const severityIcon = {
    Low: <CheckCircle2 className="h-6 w-6 text-green-500" />,
    Medium: <AlertCircle className="h-6 w-6 text-yellow-500" />,
    High: <AlertCircle className="h-6 w-6 text-red-500" />,
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-4xl mx-auto mt-8 px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Possible Conditions */}
        <motion.div variants={item} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-blue-500" />
            Possible Conditions
          </h3>
          <ul className="space-y-3">
            {results.conditions.map((condition, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/50">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  {idx + 1}
                </span>
                <span className="text-slate-700 font-medium">{condition}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Severity Level */}
        <motion.div variants={item} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-center hover:shadow-md transition-all">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Estimated Severity</h3>
          <div className={`p-8 rounded-2xl border flex flex-col items-center justify-center text-center gap-3 ring-4 ${severityColors[results.severity]}`}>
            <div className="bg-white p-3 rounded-full shadow-sm">
              {severityIcon[results.severity]}
            </div>
            <span className="text-2xl font-bold">{results.severity} Severity</span>
            <p className="text-sm font-medium opacity-90">Based on symptoms provided</p>
          </div>
        </motion.div>

        {/* Self-Care */}
        <motion.div variants={item} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:col-span-2 hover:shadow-md transition-all">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Home Care Recommendations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.careFormatted.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-green-400 shrink-0"></div>
                <p className="text-slate-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Doctor Advice */}
        <motion.div variants={item} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 p-6 md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              Next Steps
            </h3>
            <p className="text-blue-800 leading-relaxed font-medium bg-white/50 p-4 rounded-xl border border-blue-100/50">
              {results.doctorAdvice}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
