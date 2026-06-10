import { NextRequest, NextResponse } from "next/server";
// import { mediaItems } from "@/lib/data";
import { mediaItems } from "@/lib/media.repository";
import { parseGermanDate } from "@/lib/date";
// search using GET
export async function GET(req: NextRequest) {
    // getting the params
  const query =
    req.nextUrl.searchParams.get("q")?.toLowerCase() || "";
    const from =
  req.nextUrl.searchParams.get("from");

const to =
  req.nextUrl.searchParams.get("to");
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

if (from) {
  const fromDate = new Date(from);

  results = results.filter(
    (item) =>
      parseGermanDate(item.datum) >=
      fromDate
  );
}
// Date Filter
if (to) {
  const toDate = new Date(to);

  results = results.filter(
    (item) =>
      parseGermanDate(item.datum) <=
      toDate
  );
}
// json the resutls
  return NextResponse.json({
    items: results,
    total: results.length,
  });
}