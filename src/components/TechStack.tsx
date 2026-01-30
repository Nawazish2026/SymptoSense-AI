export default function TechStack() {
  const techs = [
    "Next.js 14", "Tailwind CSS", "OpenAI GPT-4", "Pinecone Vector DB", "FastAPI", "TypeScript"
  ];

  return (
    <section className="py-12 border-t border-slate-200">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Powered by Modern Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {techs.map((tech) => (
            <div key={tech} className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
