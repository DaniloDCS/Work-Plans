import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const connection = createClient(
  process.env.DATABASE_URL,
  process.env.DATABASE_KEY
);

export default connection;
