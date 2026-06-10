import { mediaItems } from "@/lib/media.repository";
import { parseGermanDate } from "@/lib/date";

export interface SearchParams {
  query: string;
  credit?: string | null;
  from?: string | null;
  to?: string | null;
  sort?: string | null;
}

export function searchMedia({
  query,
  credit,
  from,
  to,
  sort,
}: SearchParams) {
  let results = mediaItems.filter((item) =>
    item.normalizedText.includes(query)
  );
// checking params 
// credit
  if (credit) {
    results = results.filter(
      (item) => item.fotografen === credit
    );
  }
// length
  if (from) {
    const fromDate = new Date(from);

    results = results.filter(
      (item) =>
        parseGermanDate(item.datum) >= fromDate
    );
  }

  if (to) {
    const toDate = new Date(to);

    results = results.filter(
      (item) =>
        parseGermanDate(item.datum) <= toDate
    );
  }
  // sort type

  if (sort === "date_asc") {
    results.sort(
      (a, b) =>
        parseGermanDate(a.datum).getTime() -
        parseGermanDate(b.datum).getTime()
    );
  }

  if (sort === "date_desc") {
    results.sort(
      (a, b) =>
        parseGermanDate(b.datum).getTime() -
        parseGermanDate(a.datum).getTime()
    );
  }

  return results;
}

// pagination
export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number
) {
  const total = items.length;
  const totalPages = Math.ceil(
    total / pageSize
  );

  const start = (page - 1) * pageSize;

  return {
    items: items.slice(
      start,
      start + pageSize
    ),
    total,
    totalPages,
  };
}