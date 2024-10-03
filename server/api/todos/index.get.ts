// server/api/todos/index.get.ts
import { supabaseServerClient } from "../../utils/supabase";

export default defineEventHandler(async () => {
  const { data: todos, error } = await supabaseServerClient
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return todos;
});
