"use server";
import { mockAIResults } from "@/constant/mockdata";
import { ClauseGPT } from "../lib/clauseGpt";

export const analyzeClause = async (data: string) => {
  try {
    // return mockAIResults;
    const newClause = new ClauseGPT();
    const result = await newClause.analyzeClause(data);

    return result;
  } catch (error) {
    console.log({ error });
  }
};
