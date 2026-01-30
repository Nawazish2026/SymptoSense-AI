import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Analysis from "@/models/Analysis";
import { runRAGPipeline } from "@/services/ragService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { description, age, gender, duration } = body;

    if (!description || !age || !gender || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Run RAG Pipeline (Independent of DB)
    const aiResults = await runRAGPipeline({
      symptoms: description,
      age,
      gender,
      duration
    });

    // 2. Save to DB (if DB is available)
    try {
      const conn = await connectToDatabase();
      if (conn) {
        // Extract User ID from Cookie (if logged in)
        let userId = undefined;
        try {
          const { cookies } = await import("next/headers"); // Dynamic import to avoid static opt issues if needed
          const cookieStore = await cookies();
          const token = cookieStore.get("token")?.value;
          if (token) {
            const { jwtVerify } = await import("jose");
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
            const { payload } = await jwtVerify(token, secret);
            userId = payload.userId as string;
          }
        } catch (e) {
          // Ignore token error, treat as guest
        }

        await Analysis.create({
          userId,
          userInput: description,
          age,
          gender,
          duration,
          aiResponse: aiResults
        });
      } else {
        console.log("Skipping DB save: No connection available.");
      }
    } catch (dbError) {
      console.warn("Failed to save analysis to DB:", dbError);
      // Continue to return results even if save fails
    }

    return NextResponse.json({ success: true, data: aiResults });
  } catch (error) {
    console.error("Analysis API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
