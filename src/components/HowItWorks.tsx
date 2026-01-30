import { Database, FileText, Search } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "1. Enter Symptoms",
      description: "Describe how you're feeling in plain English. Add details about duration and severity."
    },
    {
      icon: <Database className="h-6 w-6 text-purple-600" />,
      title: "2. AI Analysis (RAG)",
      description: "Our system retrieves relevant medical knowledge from trusted databases using vector search."
    },
    {
      icon: <Search className="h-6 w-6 text-teal-600" />,
      title: "3. Get Insights",
      description: "Receive a structured analysis of possible causes and safe care recommendations."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-600">SymptoSense combines generative AI with verified medical data to provide safer, more accurate insights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (Desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 -right-4 w-8 border-t-2 border-slate-100 border-dashed z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
