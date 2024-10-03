import { defineEventHandler } from "h3";
import axios from "axios";
import { supabaseServerClient } from "../utils/supabase";

const openaiApiKey = process.env.OPENAI_API_KEY;

export default defineEventHandler(async (event) => {
  try {
    // Fetch all todos from Supabase
   const { data: todos, error } = await supabaseServerClient
     .from("todos")
     .select("*")
     .order("created_at", { ascending: false });

    if (error) throw new Error("Error fetching todos: " + error.message);

    // Create a summary of todos
    const todoSummary = todos.map((todo) => `- ${todo.text}`).join("\n");

    // Generate AI summary and ideas
    const prompt = `Here's my current todo list:\n\n${todoSummary}\n\nBased on this list, please provide:
        1. A brief summary of the main areas of focus in my todo list.
        2. Three innovative ideas for increasing productivity or efficiency in completing these tasks.
        3. One suggestion for a new habit or routine that could help me better manage this workload.
        4. An idea for breaking down or combining any complex tasks in the list.
        5. use indonesian languange`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    const aiSummaryAndIdeas = response.data.choices[0].message.content.trim();

    return {
      summary: aiSummaryAndIdeas,
    };
  } catch (error) {
    console.error("Error in summarize-todos:", error);
    return { error: "Failed to summarize todos and generate ideas" };
  }
});
