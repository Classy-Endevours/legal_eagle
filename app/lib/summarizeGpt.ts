import { OPENAI_API_KEY } from "@/constant/env";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY || "",
});

export class SummarizeGPT {
  private openaiClient: any; // Replace `any` with the appropriate type for `openai`
  private modelId: string;
  private systemPrompt: string;

  constructor() {
    this.openaiClient = openai;
    this.modelId = "gpt-4o-mini";
    this.systemPrompt = this.initSystemPrompt();
  }

  initSystemPrompt() {
    const systemPrompt = `You are an AI assistant specializing in summarizing legal text. Your task is to process a long unstructured string of legal clauses and extract the core information. Based on the analysis, return a JavaScript array of objects where each object contains the following structure:
    [
  {
    "title": "Concise and relevant title summarizing the issue or key clause",
    "summary": "A brief summary explaining the content or nature of the clause."
  },
]
Instructions:
Analyze the input string, identifying key clauses or issues.
Summarize each clause or issue into a title and summary format.
Return only the structured JavaScript array of objects. Exclude any additional explanations, notes, or status flags.
Example Input: The agreement shall be governed by the laws of [Jurisdiction].
The party agrees to provide services within 30 days.
Payment must be made promptly after service completion.
If any party breaches the agreement, remedies shall apply.
output should be an object with one key result that will be an array of JSON object like this
[
  {
    "title": "Governing Law Clause",
    "summary": "The agreement specifies that it is governed by the laws of a particular jurisdiction."
  },
  {
    "title": "Service Delivery Timeline",
    "summary": "The clause outlines a 30-day timeline for service delivery by the party."
  },
  {
    "title": "Payment Terms",
    "summary": "The clause mandates prompt payment after the completion of services."
  },
  {
    "title": "Remedies for Breach",
    "summary": "The agreement includes provisions for remedies in case of a breach."
  }
]
`;

    return systemPrompt;
  }

  extractJSONFromMessage(message: string) {
    const regex = /```json([\s\S]+?)```/; // Regular expression to match JSON within code blocks
    const match = message.match(regex); // Match the JSON code block
    if (match && match[1]) {
      try {
        const jsonStr = match[1].trim(); // Extract the JSON string and trim any leading/trailing whitespace
        const jsonObj = JSON.parse(jsonStr); // Parse the JSON string into a JavaScript object
        return jsonObj; // Return the parsed JSON object
      } catch (error) {
        console.error("Error parsing JSON:", error); // Log any parsing errors
        return null; // Return null if there's an error parsing the JSON
      }
    } else {
      console.error("No JSON code block found in the message."); // Log if no JSON code block is found
      return null; // Return null if no JSON code block is found
    }
  }

  async summarizeClause(data: string) {
    const response = await this.openaiClient.chat.completions.create({
      model: this.modelId,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: data },
      ],
    });

    const responseStr = response.choices[0].message.content;
    return JSON.parse(responseStr);
  }
}
