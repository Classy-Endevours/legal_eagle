"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "../lib/mongoose";
import Clause from "../models/Clause";

interface ClauseDetails {
  preferences: string;
  description: string;
}

export interface IClause {
  _id?: string;
  title: string;
  category: string;
  goodAspect: ClauseDetails;
  badAspect: ClauseDetails;
}

// Create a new clause
export async function createClause(formData: IClause) {
  try {
    await dbConnect();

    const clause = new Clause(formData);
    await clause.save();
    revalidatePath("/clauses");

    return { success: true };
  } catch (error: any) {
    console.error("Create clause error:", error.message);
    return {
      success: false,
      error: error.message || "Failed to create clause",
    };
  }
}

// Read all clauses
export async function getClauses() {
  try {
    await dbConnect();
    const clauses = await Clause.find({}).lean();
    return { success: true, data: JSON.parse(JSON.stringify(clauses)) };
  } catch (error) {
    console.error("Get clauses error:", error);
    return { success: false, error: "Failed to fetch clauses" };
  }
}

// Read single clause
export async function getClause(id: string) {
  try {
    await dbConnect();
    const clause = await Clause.findById(id).lean();
    if (!clause) {
      return { success: false, error: "Clause not found" };
    }
    return { success: true, data: clause };
  } catch (error) {
    console.error("Get clause error:", error);
    return { success: false, error: "Failed to fetch clause" };
  }
}

// Update clause
export async function updateClause(id: string, clauseData: IClause) {
  try {
    await dbConnect();
    const { _id, ...updateData } = clauseData;
    const updatedClause = await Clause.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedClause) {
      return { success: false, error: "Clause not found" };
    }

    revalidatePath("/clauses");
    return { success: true, data: updatedClause };
  } catch (error) {
    console.error("Update clause error:", error);
    return { success: false, error: "Failed to update clause" };
  }
}

// Delete clause
export async function deleteClause(id: string) {
  try {
    await dbConnect();
    const deletedClause = await Clause.findByIdAndDelete(id);

    if (!deletedClause) {
      return { success: false, error: "Clause not found" };
    }

    revalidatePath("/clauses");
    return { success: true };
  } catch (error) {
    console.error("Delete clause error:", error);
    return { success: false, error: "Failed to delete clause" };
  }
}

// Search clauses by title or category
export async function searchClauses(searchTerm: string) {
  try {
    await dbConnect();
    const clauses = await Clause.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    }).lean();

    return { success: true, data: JSON.parse(JSON.stringify(clauses)) };
  } catch (error) {
    console.error("Search clauses error:", error);
    return { success: false, error: "Failed to search clauses" };
  }
}

// Get clauses by category
export async function getClausesByCategory(category: string) {
  try {
    await dbConnect();
    const clauses = await Clause.find({ category }).lean();
    return { success: true, data: JSON.parse(JSON.stringify(clauses)) };
  } catch (error) {
    console.error("Get clauses by category error:", error);
    return { success: false, error: "Failed to fetch clauses by category" };
  }
}
