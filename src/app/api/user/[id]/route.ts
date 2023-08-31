import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongoClient";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const client = await clientPromise;
  const db = client.db("Users");
  const reqBlog = await db
    .collection("blogs")
    .findOne({ _id: new ObjectId(id) });
  return NextResponse.json(reqBlog);
}
