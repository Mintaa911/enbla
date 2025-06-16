import { Database, Tables } from "./database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type Event = Tables<"events">;