// server/api/todos/[id].put.ts
import { supabaseServerClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  const id = event.context.params!.id;
  const body = await readBody(event);

  const { data: todo, error } = await supabaseServerClient
    .from("todos")
    .update({ completed: body.completed })
    .eq("id", id)
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return todo;
});
