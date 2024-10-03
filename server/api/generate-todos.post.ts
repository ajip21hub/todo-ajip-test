// server/api/generate-todos.post.ts
import { generateTodoList } from "../utils/openai";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const prompt = body.prompt;

  try {
    const tasks = await generateTodoList(prompt);
    return { tasks };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error generating tasks",
    });
  }
});
