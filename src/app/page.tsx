"use client";

import { useEffect, useState } from "react";

interface MediaItem {
  id: number;
  bildnummer: string;
  fotografen: string;
  datum: string;
  suchtext: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  // filters
  const [credit, setCredit] = useState("");
 const [from, setFrom] = useState("");
 const [to, setTo] = useState("");
 const [sort, setSort] = useState("date_desc");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        const data = await response.json();

        setResults(data.items ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            IMAGO Search
          </h1>

          <p className="text-slate-500 mt-2">
            Search media items and metadata
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <input
            type="text"
            placeholder="Search media..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Filters */}
        <div
          className="
            bg-white
            rounded-xl
            shadow-sm
            p-4
            mb-6
            grid
            grid-cols-1
            md:grid-cols-4
            gap-4
          "
        >
          <select className="border rounded-lg p-3">
            <option>All Credits</option>
          </select>

          <input
            type="date"
            className="border rounded-lg p-3"
          />

          <input
            type="date"
            className="border rounded-lg p-3"
          />

          <select className="border rounded-lg p-3">
            <option>Date Desc</option>
            <option>Date Asc</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            Searching...
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  rounded-xl
                  shadow-sm
                  p-5
                  hover:shadow-md
                  transition
                "
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {item.bildnummer}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {item.fotografen}
                    </p>
                  </div>

                  <span className="text-sm text-slate-500">
                    {item.datum}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-700">
                  {item.suchtext}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          query &&
          results.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold">
                No results found
              </h2>

              <p className="text-slate-500 mt-2">
                Try another search term.
              </p>
            </div>
          )}
      </div>
    </main>
  );
}