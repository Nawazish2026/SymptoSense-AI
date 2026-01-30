import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Analysis from "@/models/Analysis";

// Force Node.js runtime for DB
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const conn = await connectToDatabase();

    let history: any[] = [];

    // Retrieve from DB if connected
    if (conn) {
      try {
        // Extract User ID from Cookie
        let userId = null;
        try {
          const { cookies } = await import("next/headers");
          const cookieStore = await cookies();
          const token = cookieStore.get("token")?.value;
          if (token) {
            const { jwtVerify } = await import("jose");
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
            const { payload } = await jwtVerify(token, secret);
            userId = payload.userId;
          }
        } catch (e) {
          // Invalid token
        }

        if (userId) {
          history = await Analysis.find({ userId }).sort({ createdAt: -1 }).limit(10);
        } else {
          // If not logged in, return empty or generic info? 
          // For now, let's return nothing or maybe just demo data but separate?
          // Let's return empty array so UI shows "No history" (or prompts login)
          history = [];
        }
      } catch (e) {
        console.warn("DB query failed even though connection exists:", e);
        history = [];
      }
    } else {
      // Mock history if no DB
      console.log("Using Mock History Data (No DB Connection)");
      history = [
        {
          userInput: "Severe migraine and light sensitivity (Demo)",
          age: "adult",
          gender: "female",
          duration: "days",
          aiResponse: { severity_level: "Medium" },
          createdAt: new Date(Date.now() - 86400000)
        }
      ];
    }

    return NextResponse.json({ success: true, data: history });
  } catch (error) {
    console.error("History API Error:", error);
    // Return mock data even on error to prevent UI crash during demo
    return NextResponse.json({
      success: true,
      data: [],
      error: "Fallback mode active"
    });
  }
}
