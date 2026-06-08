import { NextRequest, NextResponse } from "next/server";
import { mediaItems } from "../../../lib/data";

export async function GET(req: NextRequest) {
  const query =
    req.nextUrl.searchParams.get("q")?.toLowerCase() || "";

  const results = mediaItems.filter((item) =>
    item.suchtext.toLowerCase().includes(query)
  );

  return NextResponse.json({
    items: results,
    total: results.length,
  });
}