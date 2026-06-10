# IMAGO Media Search Challenge

A lightweight Next.js search experience for inconsistent media metadata. The app implements a typed HTTP search endpoint, deterministic 12,000-item demo dataset, preprocessing/indexing, faceted filters, date sorting, pagination, basic analytics, and a Tailwind UI.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm test
npm run build
npm run generate:pdf
```

## API

`GET /api/search`

Query params:

- `q`: keyword query across `suchtext`, `fotografen`, and `bildnummer`
- `credit`: exact `fotografen` filter
- `dateFrom`, `dateTo`: ISO or common source date formats
- `restriction`: repeatable restriction filter, for example `restriction=PUBLICATION_IN_GER_SUI_AUT_ONLY`
- `sort`: `date_desc` or `date_asc`
- `page`, `pageSize`: pagination, capped at 50 items per page

Response:

```json
{
  "items": [],
  "page": 1,
  "pageSize": 12,
  "total": 1200,
  "totalPages": 100,
  "elapsedMs": 3.2
}
```

Additional endpoints:

- `GET /api/facets`: available credits and restrictions
- `GET /api/analytics`: in-memory search count, average response time, common keywords

## My approach

The challenge references a `seed.json`, but no file was present in this workspace. I therefore generated deterministic IMAGO-like seed data in `lib/search/seed.ts` with the required fields: `suchtext`, `fotografen`, `bildnummer`, and `datum`. The generator creates 12,000 records so the performance requirement can be exercised locally without external services.

The search layer is intentionally small and explicit:

- Normalize text once at module initialization.
- Extract structured restrictions from compact caption tokens such as `PUBLICATIONxINxGERxSUIxAUTxONLY`.
- Parse dates into ISO `YYYY-MM-DD` while keeping the original value.
- Build an in-memory token map for candidate retrieval.
- Score candidates with weighted field relevance.

This keeps the implementation easy to review for a coding challenge while making the production path clear.

## Preprocessing

Implemented preprocessing:

- Restriction extraction: regex finds uppercase x-delimited phrases ending in `xONLY`; output is normalized with underscores, e.g. `PUBLICATION_IN_GER_SUI_AUT_ONLY`.
- Date normalization: accepts ISO, German dotted dates, and US slash dates; stores an ISO date and timestamp for range filtering/sorting.
- Token normalization: captions, credits, and image numbers are tokenized once instead of repeatedly at request time.
- Lightweight index: a module-level `Map<token, Set<itemIndex>>` supports fast candidate selection for 12,000+ records.

This happens at runtime on first module load. In production I would move it to build-time or ingestion-time indexing.

## Frontend decisions

The interface is built for repeated search work rather than a marketing page: dense controls, clear labels, keyboard-friendly native inputs/selects, visible focus states, loading/empty/error states, pagination, and snippets. I used a list layout because the challenge data is metadata-heavy and no image URLs were available.

## Scaling to millions of items

For millions of items and continuous ingestion, I would move search out of process:

- Store canonical media metadata in Postgres or the existing media system of record.
- Publish ingestion events to a queue when media or metadata changes.
- Normalize dates, restrictions, people, locations, and caption tokens in an ingestion worker.
- Index searchable documents in Elasticsearch, OpenSearch, or Meilisearch depending on operational needs.
- Use analyzers for language-aware tokenization, synonyms, stemming, typo tolerance, and field boosts.
- Keep filters as keyword/date fields for fast faceting.
- Add cursor-based pagination for deep result navigation and CDN/cache popular anonymous queries where appropriate.
- Track analytics in durable storage, aggregated by query, filters, latency percentiles, and zero-result searches.

## Limitations and trade-offs

- The seed dataset is generated because no provided file was available.
- Prefix matching is implemented by scanning token keys. That is fine for 12,000 records; at larger scale I would use a trie, n-gram index, or a proper search engine.
- Analytics are process-local and reset when the server restarts.
- Credit filtering is exact-match to keep the UI unambiguous; production could add credit alias normalization.
- The demo does not implement image previews because the source schema did not include URLs.



## Deployment and repository

This project is ready for a public GitHub repository.