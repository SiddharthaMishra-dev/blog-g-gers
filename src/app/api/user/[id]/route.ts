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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await req.json();
  if (json?._id) {
    json._id = new ObjectId(json._id);
  }
  if (json?.userId) {
    json.userId = new ObjectId(json.userId);
  }
  const client = await clientPromise;
  const db = client.db("Users");
  const reqBlog = await db
    .collection("blogs")
    .findOne({ _id: new ObjectId(id) });
  await db
    .collection("blogs")
    .updateOne(
      { _id: new Object(reqBlog?._id) },
      { $set: { ...json, _id: reqBlog?._id } }
    );
  return NextResponse.json("updated");
}

export async function DELETE(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const client = await clientPromise;
  const db = client.db("Users");
  const reqBlog = await db
    .collection("blogs")
    .deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ msg: "deleted", status: 1 });
}
