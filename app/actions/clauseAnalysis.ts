"use server";
import { mockAIResults } from "@/constant/mockdata";
import { ClauseGPT } from "../lib/clauseGpt";

export const analyzeClause = async (data: string) => {
  try {
    const newClause = new ClauseGPT();
    const result = await newClause.analyzeClause(data);

    return result;
  } catch (error) {
    console.log({ error });
  }
};
