import mongoose, { Schema, Model } from "mongoose";

export interface IAnalysis {
  userId?: string;
  userInput: string;
  age: string;
  gender: string;
  duration: string;
  aiResponse: {
    possible_conditions: string[];
    severity_level: "Low" | "Medium" | "High";
    self_care_tips: string[];
    doctor_visit_advice: string;
  };
  createdAt: Date;
}

const AnalysisSchema = new Schema<IAnalysis>({
  userId: { type: String, required: false, index: true },
  userInput: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  duration: { type: String, required: true },
  aiResponse: {
    possible_conditions: [String],
    severity_level: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },
    self_care_tips: [String],
    doctor_visit_advice: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model recompilation error in Next.js hot reload
const Analysis: Model<IAnalysis> = mongoose.models.Analysis || mongoose.model("Analysis", AnalysisSchema);

export default Analysis;
