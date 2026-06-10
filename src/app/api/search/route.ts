import { NextRequest, NextResponse } from "next/server";

import {
  searchMedia,
  paginate,
} from "@/lib/search.service";

export async function GET(
  req: NextRequest
) {
    // getting params
  const query =
    req.nextUrl.searchParams
      .get("q")
      ?.toLowerCase() || "";

  const credit =
    req.nextUrl.searchParams.get(
      "credit"
    );

  const from =
    req.nextUrl.searchParams.get(
      "from"
    );

  const to =
    req.nextUrl.searchParams.get(
      "to"
    );
// Sorting
  const sort =
    req.nextUrl.searchParams.get(
      "sort"
    );
// Numbers
  const page = Number(
    req.nextUrl.searchParams.get(
      "page"
    ) || "1"
  );

  const pageSize = Number(
    req.nextUrl.searchParams.get(
      "pageSize"
    ) || "20"
  );

  const results = searchMedia({
    query,
    credit,
    from,
    to,
    sort,
  });

  const paginated = paginate(
    results,
    page,
    pageSize
  );
// setting json result
  return NextResponse.json({
    ...paginated,
    page,
    pageSize,
  });
}