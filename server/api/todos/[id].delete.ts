// server/api/todos/[id].delete.ts
import { supabaseServerClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  const id = event.context.params!.id;

  const { error } = await supabaseServerClient
    .from("todos")
    .delete()
    .eq("id", id);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { message: "Todo deleted successfully" };
});
