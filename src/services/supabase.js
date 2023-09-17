import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cfefqomezrdvdxqhbybl.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZWZxb21lenJkdmR4cWhieWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0NDgxNDYsImV4cCI6MjAxMDAyNDE0Nn0.G6pDUu2aM7pfRyD1ncmdS2wxFcHSypBDfwlM_10hNTM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;