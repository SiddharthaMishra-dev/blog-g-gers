import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/utils/mongoClient";
import { getSession } from "next-auth/react";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  // console.log(session);
  const client = await clientPromise;
  const db = client.db("Users");
  const reqUser = await db.collection("users").findOne(session.user);

  const reqBlogs = await db
    .collection("blogs")
    .find({ userId: new ObjectId(reqUser?._id) })
    .toArray();

  return NextResponse.json(reqBlogs);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("connecting to mongodb");
  const client = await clientPromise;
  const db = client.db("Users");
  const reqUser = await db.collection("users").findOne(data.session.user);
  // console.log(reqUser)
  await db.collection("blogs").insertOne({
    title: data.title,
    hashtags: data.hashtags,
    content: data.content,
    likes: data.likes,
    userId: reqUser?._id,
  });
  console.log("connected to DB");
  return NextResponse.json("Send");
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const json = await req.json();
  const client = await clientPromise;
  const db = client.db("Users");
  const reqBlog = await db
    .collection("blogs")
    .findOne({ _id: new ObjectId(json.blog?._id) });
  await db
    .collection("blogs")
    .updateOne(
      { _id: reqBlog?._id },
      { $set: { ...json.blog, _id: reqBlog?._id } }
    );

  return NextResponse.json("received");
}
