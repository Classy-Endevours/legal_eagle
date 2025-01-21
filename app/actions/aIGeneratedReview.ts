"use server";
import { IClauseData } from "@/hooks/useClause";
import dbConnect from "../lib/mongoose";
import AIReview from "../models/AIGeneratedReview";

interface IDocumentedClauseData extends IClauseData {
  document: string;
}

export const saveAIGeneratedReview = async ({
  data,
  documentId,
}: {
  data: {
    result: IClauseData[];
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

    const response = await AIReview.insertMany(finalReport);
    const formattedResponse = JSON.parse(JSON.stringify(response));

    return {
      message: "ai generated reviews saved",
      data: formattedResponse,
    };
  } catch (error) {
    return {
      message: error,
    };
  }
};

export const getAllReportsByDocumentId = async (documentId: string) => {
  try {
    await dbConnect();

    const documents = await AIReview.find({ document: documentId });
    const parsedDocuments = JSON.parse(JSON.stringify(documents));
    return parsedDocuments;
  } catch (error) {
    return {
      message: error,
    };
  }
};
