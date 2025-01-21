"use server";
import {
  mockAIResults,
  newMockData,
  newMockSummary,
  summaryResults,
} from "@/constant/mockdata";
import { ClauseGPT } from "../lib/clauseGpt";
import { SummarizeGPT } from "../lib/summarizeGpt";
import {
  getAllReportsByDocumentId,
  saveAIGeneratedReview,
} from "./aIGeneratedReview";
import { getAllSummaryByDocumentId, saveAIGeneratedSummary } from "./aiSummary";

export const analyzeClause = async ({
  content,
  documentId,
}: {
  content: string;
  documentId: string;
}) => {
  try {
    if (documentId) {
      const response = await getAllReportsByDocumentId(documentId);
      if (response.length !== 0) {
        return response;
      } else {
        // return mockAIResults;

        const newClause = new ClauseGPT();
        const result = await newClause.analyzeClause(content);
        const { data } = await saveAIGeneratedReview({
          data: result,
          documentId,
        });
        // const { data } = await saveAIGeneratedReview({
        //   data: newMockData,
        //   documentId,
        // });

        return data;
      }
    }
  } catch (error) {
    console.log({ error });
  }
};

export const summarizeClause = async (data: string, documentId: string) => {
  try {
    if (documentId) {
      const response = await getAllSummaryByDocumentId(documentId);
      if (response.length !== 0) {
        return response;
      } else {
        const newSummarize = new SummarizeGPT();
        const response = await newSummarize.summarizeClause(data);
        const { result } = await saveAIGeneratedSummary({
          data: response,
          // data: newMockSummary,
          documentId,
        });
        return result;
      }
    }
  } catch (error) {
    console.log({ error });
  }
};
