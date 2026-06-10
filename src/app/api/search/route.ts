import { NextRequest, NextResponse } from "next/server";
// import { mediaItems } from "@/lib/data";
import { mediaItems } from "@/lib/media.repository";
// search using GET
export async function GET(req: NextRequest) {
    // getting the params
  const query =
    req.nextUrl.searchParams.get("q")?.toLowerCase() || "";
// pagination
  const page = Number(
    req.nextUrl.searchParams.get("page") || "1"
  );
  // Credit Filter
  const credit =
  req.nextUrl.searchParams.get("credit");

  const pageSize = Number(
    req.nextUrl.searchParams.get("pageSize") || "20"
  );
// filtter 
  let results = mediaItems.filter((item) =>
item.normalizedText.includes(
  query.toLowerCase()
)  );

if (credit) {
  results = results.filter((item) =>
    item.fotografen === credit
  );
}
// json the resutls
  return NextResponse.json({
    items: results,
    total: results.length,
  });
}