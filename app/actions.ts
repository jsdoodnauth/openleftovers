'use server'

import { ChatOpenAI } from "@langchain/openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);

export async function generateRecipes(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  prompt = `Generate three recipes using leftovers.  The leftovers we have are ${prompt}. We do not have to use all the leftover ingredients.  The output should be in a JSON array and each object should contain a recipe name field named 'name', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'instructions'.`;
  // const response = await chatModel.invoke(prompt);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().replace("```json", "").replace("```", "");
}