// server/utils/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

export const supabaseServerClient = createClient(
  supabaseUrl!,
  supabaseServiceKey!
);
