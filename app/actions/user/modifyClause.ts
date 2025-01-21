"use server";

import { UserPromptGPT } from "@/app/lib/userPromptGpt";
import { userModifyMockData3, userModifyMockData4 } from "@/constant/mockdata";

function getRandomString(str1: string, str2: string) {
  const randomIndex = Math.floor(Math.random() * 2); // Generates 0 or 1
  return randomIndex === 0 ? { result: str1 } : { result: str2 };
}

export const modifyClause = async (userPrompt: string, content: string) => {
  try {
    const output = getRandomString(userModifyMockData3, userModifyMockData4);
    return output;
    const newUserPrompt = new UserPromptGPT();
    const response = await newUserPrompt.modify(userPrompt, content);
    return response;
  } catch (error) {
    console.log(error);
  }
};
