import { NextRequest, NextResponse } from "next/server";
import { mediaItems } from "@/lib/data";
// search using GET
export async function GET(req: NextRequest) {
    // getting the params
  const query =
    req.nextUrl.searchParams.get("q")?.toLowerCase() || "";
// filtter 
  const results = mediaItems.filter((item) =>
    item.suchtext.toLowerCase().includes(query)
  );
// json the resutls
  return NextResponse.json({
    items: results,
    total: results.length,
  });
}