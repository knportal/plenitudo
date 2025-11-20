/**
 * Search document types for indexing content.
 * Used to prepare for instant search functionality.
 */

/**
 * Base search document structure.
 * All searchable content (Threads, Posts, ChatMessages) implements this.
 */
export interface SearchDoc {
  /** Unique document ID */
  id: string;
  /** Document type: 'thread', 'post', or 'chatmessage' */
  type: "thread" | "post" | "chatmessage";
  /** Primary text content to search */
  content: string;
  /** Optional title (for threads) */
  title?: string;
  /** Author name */
  authorName?: string;
  /** Timestamp for sorting/filtering */
  createdAt: string;
  /** Additional metadata for filtering/faceting */
  metadata?: Record<string, unknown>;
}

/**
 * Search document for a Thread.
 */
export interface ThreadSearchDoc extends SearchDoc {
  type: "thread";
  title: string;
  roomSlug: string;
  roomTitle?: string;
  threadId: string;
}

/**
 * Search document for a Post.
 */
export interface PostSearchDoc extends SearchDoc {
  type: "post";
  threadId: string;
  threadTitle?: string;
  roomSlug: string;
  pinned?: boolean;
  authorName?: string; // Explicitly allow undefined
}

/**
 * Search document for a ChatMessage.
 */
export interface ChatMessageSearchDoc extends SearchDoc {
  type: "chatmessage";
  threadId: string;
  threadTitle?: string;
  roomSlug: string;
}

/**
 * Union type of all search documents.
 */
export type AnySearchDoc = ThreadSearchDoc | PostSearchDoc | ChatMessageSearchDoc;


