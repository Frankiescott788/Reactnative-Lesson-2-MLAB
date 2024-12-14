import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rlzxocoqmxxaudiivvmb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsenhvY29xbXh4YXVkaWl2dm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NzczNzgsImV4cCI6MjA0OTM1MzM3OH0.i8fMIAhVrL3MNvRoHde-TgGeuI6w7y7LqBkrVVCxrAQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false, // Useful for React Native since session persistence is handled manually
  },
});

export default supabase;
