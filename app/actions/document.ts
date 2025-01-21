"use server";
import dbConnect from "../lib/mongoose";
import File from "../models/File";

export const createDocument = async (data: string) => {
  try {
    await dbConnect();

    const newDocument = {
      content: data,
    };
    const result = await File.create(newDocument);
    const { _id, content } = result;
    const id = _id.toString();
    const newData = {
      _id: id,
      content,
    };

    return { message: "created", data: newData };
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllFiles = async () => {
  try {
    await dbConnect();
    const files = await File.find().limit(5).lean();
    const parsedFiles = JSON.parse(JSON.stringify(files));
    return parsedFiles;
  } catch (error) {
    console.log(error);
  }
};
