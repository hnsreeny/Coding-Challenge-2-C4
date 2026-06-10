"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
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
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            IMAGO Search
          </h1>

          <p className="text-slate-500 mt-2">
            Search media items and metadata
          </p>
        </div>

      </div>
    </main>
  );


}