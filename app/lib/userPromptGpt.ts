import { OPENAI_API_KEY } from "@/constant/env";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY || "",
});

export class UserPromptGPT {
  private openaiClient: any; // Replace `any` with the appropriate type for `openai`
  private modelId: string;
  private systemPrompt: string;

  constructor() {
    this.openaiClient = openai;
    this.modelId = "gpt-4o-mini";
    this.systemPrompt = this.initSystemPrompt();
  }

  initSystemPrompt() {
    const systemPrompt = `You are a highly intelligent text editing assistant. Your task is to receive a document as a string and a user prompt with specific instructions for modifications. Based on the user's instructions:
Make changes to the document as specified, ensuring the output is properly formatted for display in a Word file.
Avoid adding any unnecessary special characters, symbols, or formatting that would interfere with the readability of the document in a Word processor.
Retain the original formatting style unless specified otherwise in the user prompt. Ensure headers, paragraphs, and lists are properly structured as plain text.
If the user provides unclear or incomplete instructions, attempt to resolve ambiguities while maintaining professional formatting.
output will be a json object containing result as key eg: {
result:"your output"} `;

    return systemPrompt;
  }

  async modify(userPrompt: string, data: string) {
    const response = await this.openaiClient.chat.completions.create({
      model: this.modelId,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: `Instructions: ${userPrompt}` },
        { role: "user", content: data },
      ],
    });

    const responseStr = response.choices[0].message.content;
    return JSON.parse(responseStr);
  }
}
