"use server";
import { IClauseData, IClauseSummary } from "@/hooks/useClause";
import dbConnect from "../lib/mongoose";
import AIReview from "../models/AIGeneratedReview";
import AISummary from "../models/AISummary";

interface IDocumentedClauseData extends IClauseSummary {
  document: string;
}

export const saveAIGeneratedSummary = async ({
  data,
  documentId,
}: {
  data: {
    result: IClauseSummary[];
  };
  documentId: string;
}) => {
  await dbConnect();

  if (!data || !documentId) {
    return { message: "invalid input" };
  }
  try {
    const finalReport: IDocumentedClauseData[] = [];
    data.result.forEach((item) => {
      const newObj: Partial<IDocumentedClauseData> = { ...item };
      newObj.document = documentId;
      finalReport.push(newObj as IDocumentedClauseData);
    });

    const response = await AISummary.insertMany(finalReport);
    const parsedResponse  = JSON.parse(JSON.stringify(response))

    return {
      message: "ai generated summary saved",
      result: parsedResponse,
    };
  } catch (error) {
    return {
      message: error,
    };
  }
};

export const getAllSummaryByDocumentId = async (documentId: string) => {
  try {
    await dbConnect();

    const documents = await AISummary.find({ document: documentId });
    const parsedDocuments = JSON.parse(JSON.stringify(documents));
    return parsedDocuments;
  } catch (error) {
    return {
      message: error,
    };
  }
};
