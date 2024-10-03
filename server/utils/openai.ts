// utils/openai.ts
import axios from "axios";

const openaiApiKey = process.env.OPENAI_API_KEY;

export async function generateTodoList(prompt: string): Promise<string[]> {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
    }
  );

  const content = response.data.choices[0].message.content as string;
  const tasks = content
    .split("\n")
    .map((task) => task.replace(/^\d+\.\s*/, "").trim())
    .filter((task) => task.length > 0);
  return tasks;
}
