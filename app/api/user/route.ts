import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { authOptions } from "@/config/authoptions";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/utils/mongoClient";
import { getSession } from "next-auth/react";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  // console.log(session);
  const client = await clientPromise;
  const dbusers = client.db("Users");
  const dbtest = client.db("test");
  if (session === null) {
    return NextResponse.json("No user found");
  } else {
    const reqUser = await dbtest.collection("users").findOne(session.user!);
    const reqBlogs = await dbusers.collection("blogs").find({ userId: reqUser?._id }).toArray();
    return NextResponse.json(reqBlogs);
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("connecting to mongodb");
  const client = await clientPromise;
  const dbusers = client.db("Users");
  const dbtest = client.db("test");
  const reqUser = await dbtest.collection("users").findOne(data.session.user);
  await dbusers.collection("blogs").insertOne({
    title: data.title,
    hashtags: data.hashtags,
    content: data.content,
    likes: data.likes,
    userId: reqUser?._id,
    username: data.session.user.name,
  });
  console.log("connected to DB");
  return NextResponse.json("Send");
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const json = await req.json();
  const client = await clientPromise;
  const dbusers = client.db("Users");
  const dbtest = client.db("test");
  const reqBlog = await dbusers.collection("blogs").findOne({ _id: new ObjectId(json.blog?._id) });
  await dbusers.collection("blogs").updateOne(
    { _id: reqBlog?._id },
    {
      $set: {
        ...json.blog,
        _id: reqBlog?._id,
        userId: new ObjectId(json.blog.userId),
      },
    }
  );

  return NextResponse.json("received");
}
