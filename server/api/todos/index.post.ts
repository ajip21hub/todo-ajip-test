// server/api/todos/index.post.ts
import { supabaseServerClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { data: todo, error } = await supabaseServerClient
    .from("todos")
    .insert([{ text: body.text }])
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return todo;
});
