import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-8 rounded-r-md mx-auto max-w-4xl shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">Medical Disclaimer</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              This AI tool (SymptoSense) uses artificial intelligence to search medical knowledge bases.
              <strong> It does NOT provide a medical diagnosis.</strong> The results are for informational purposes only.
              Always consult a qualified healthcare provider for diagnosis and treatment.
              If you have a medical emergency, call emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
