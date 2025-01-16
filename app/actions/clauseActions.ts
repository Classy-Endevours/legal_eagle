"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import clientPromise from "../lib/mongodb";

export interface Clause {
  _id?: string;
  clause: string;
  category: string;
  preferences: string;
  description: string;
}

// Create a new clause
export async function createClause(formData: Clause) {
  try {
    const client = await clientPromise;
    const db = client.db("clauselibrary");
    await db.collection("clauses").insertOne(formData as any);
    revalidatePath("/clauses");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create clause" };
  }
}

// Read all clauses
export async function getClauses() {
  try {
    const client = await clientPromise;
    const db = client.db("clauselibrary");

    const clauses = await db.collection("clauses").find({}).toArray();
    return { success: true, data: JSON.parse(JSON.stringify(clauses)) };
  } catch (error) {
    return { success: false, error: "Failed to fetch clauses" };
  }
}

// Read single clause
export async function getClause(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("clauselibrary");

    const clause = await db
      .collection("clauses")
      .findOne({ _id: new ObjectId(id) });
    return { success: true, data: clause };
  } catch (error) {
    return { success: false, error: "Failed to fetch clause" };
  }
}

// Update clause
export async function updateClause(id: string, clause: Clause) {
  try {
    const client = await clientPromise;
    const db = client.db("clauselibrary");

    const { _id, ...clauseData } = clause;

    await db
      .collection("clauses")
      .updateOne({ _id: new ObjectId(id) }, { $set: clauseData });

    revalidatePath("/clauses");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to update clause" };
  }
}

// Delete clause
export async function deleteClause(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("clauselibrary");

    await db.collection("clauses").deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/clauses");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete clause" };
  }
}
