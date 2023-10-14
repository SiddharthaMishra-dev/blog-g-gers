import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/utils/mongoClient";
export async function GET(req: NextRequest, res: NextResponse) {
  const client = await clientPromise;
  const db = client.db("Users");
  const reqRes = await db.collection("blogs").find().toArray();
  return NextResponse.json(reqRes);
}
