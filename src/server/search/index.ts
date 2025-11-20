/**
 * Search indexing abstraction.
 *
 * TODO: Replace no-op implementation with real search backend.
 *
 * Recommended options:
 * - Meilisearch: Open-source, fast, typo-tolerant
 * - Typesense: Open-source, instant search
 * - Algolia: Managed service (paid)
 *
 * Meilisearch integration pattern:
 * ```typescript
 * import { MeiliSearch } from "meilisearch";
 *
 * const client = new MeiliSearch({
 *   host: process.env.MEILISEARCH_HOST || "http://localhost:7700",
 *   apiKey: process.env.MEILISEARCH_MASTER_KEY,
 * });
 *
 * export async function indexDocuments(docs: SearchDoc[]): Promise<void> {
 *   if (docs.length === 0) return;
 *
 *   const index = client.index("content");
 *   await index.addDocuments(docs);
 * }
 * ```
 *
 * Typesense integration pattern:
 * ```typescript
 * import Typesense from "typesense";
 *
 * const client = new Typesense.Client({
 *   nodes: [{
 *     host: process.env.TYPESENSE_HOST || "localhost",
 *     port: 8108,
 *     protocol: "http",
 *   }],
 *   apiKey: process.env.TYPESENSE_API_KEY,
 * });
 *
 * export async function indexDocuments(docs: SearchDoc[]): Promise<void> {
 *   if (docs.length === 0) return;
 *
 *   try {
 *     await client.collections("content").documents().import(docs, { action: "upsert" });
 *   } catch (error) {
 *     console.error("Failed to index documents:", error);
 *   }
 * }
 * ```
 *
 * Setup steps:
 * 1. Choose provider (Meilisearch recommended for open-source)
 * 2. Install SDK: `npm install meilisearch` or `npm install typesense`
 * 3. Run search service (Docker/local/server)
 * 4. Add env vars: `MEILISEARCH_HOST`, `MEILISEARCH_MASTER_KEY` (or Typesense equivalents)
 * 5. Create search index/collection with proper schema
 * 6. Replace no-op implementation below
 */

import type { SearchDoc } from "./types";

/**
 * Index documents for search.
 *
 * Current: No-op implementation (does nothing).
 * TODO: Replace with Meilisearch, Typesense, or other search backend.
 *
 * This abstraction allows search indexing to be added later without
 * changing calling code. Simply replace this function with the real
 * implementation when ready.
 *
 * @param docs Array of search documents to index
 * @returns Promise that resolves when indexing is complete (or no-op completes)
 */
export async function indexDocuments(docs: SearchDoc[]): Promise<void> {
  if (docs.length === 0) {
    return;
  }

  // No-op: Log in development to verify calls are made
  if (process.env.NODE_ENV === "development") {
    console.log(`[SEARCH] Would index ${docs.length} document(s)`);
    docs.forEach((doc) => {
      console.log(
        `  - ${doc.type}:${doc.id} (${doc.content.substring(0, 50)}...)`
      );
    });
  }

  // TODO: Replace with real search backend implementation
  // Example: await meilisearchClient.index("content").addDocuments(docs);
}

/**
 * Remove documents from search index.
 *
 * Current: No-op implementation.
 * TODO: Replace with real search backend deletion.
 */
export async function removeDocuments(
  docIds: string[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _type?: SearchDoc["type"]
): Promise<void> {
  if (docIds.length === 0) {
    return;
  }

  // No-op: Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[SEARCH] Would remove ${docIds.length} document(s)`);
  }

  // TODO: Replace with real search backend deletion
  // Example: await meilisearchClient.index("content").deleteDocuments(docIds);
}
