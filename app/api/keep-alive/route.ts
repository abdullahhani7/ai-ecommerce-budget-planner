import { getCategories } from "@/app/_utils/Api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const categories = await getCategories();

    return NextResponse.json(
      {
        success: true,
        message: "Supabase keep-alive ping successful!",
        timestamp: new Date().toISOString(),
        count: categories ? categories.length : 0,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
