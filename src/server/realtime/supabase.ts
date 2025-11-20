/**
 * Supabase browser client for Realtime subscriptions.
 * Uses public anon key - safe for client-side use.
 * Returns null if env vars are missing (Realtime is optional).
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
const supabaseAnonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

