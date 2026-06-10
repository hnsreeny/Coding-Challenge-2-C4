"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
// loading
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );

      const data = await response.json();

      setResults(data.items);

      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        IMAGO Search
      </h1>

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full border rounded p-3"
      />
{/* if loading takes more time */}
      {loading && (
        <p className="mt-4">
          Searching...
        </p>
      )}
{/* map out the results */}
      <div className="mt-6 space-y-4">
        {results.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4"
          >
            <div>
              <strong>
                {item.bildnummer}
              </strong>
            </div>

            <div>
              {item.fotografen}
            </div>

            <div>
              {item.datum}
            </div>

            <div className="mt-2 text-sm">
              {item.suchtext}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}