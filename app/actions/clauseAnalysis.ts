"use server"
import { mockAIResults } from "@/constant/mockdata";
import { ClauseGPT } from "../lib/clauseGpt";

export const analyzeClause = async (data: string) => {
  try {
    return mockAIResults.output
    const newClause = new ClauseGPT();
    const result = await newClause.analyzeClause(data);
    console.log({result})
    return result;
  } catch (error) {
    console.log({ error });
  }
};
