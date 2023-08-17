import { NextResponse,NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import connectMongo from '../../../utils/connectMongo'
import clientPromise from "@/utils/mongoClient";
import { getSession } from "next-auth/react";

export async function GET(req:NextRequest,res:NextResponse){
    const session = await getServerSession(authOptions)
    const client= await clientPromise
    const db=client.db('Users')
    const reqUser=await db.collection('users').findOne(session.user)
    const reqBlogs=await db.collection('blogs').find({"userId":reqUser?._id}).toArray()
    // console.log(reqBlogs)
    return NextResponse.json(reqBlogs)
}

export async function POST(req:NextRequest){
    const data=await req.json()
    // console.log(data.session.user)
    // console.log(data)
    console.log("connecting to mongodb")
    const client =await clientPromise
    const db=client.db('Users')
    const reqUser=await db.collection('users').findOne(data.session.user)
    // console.log(reqUser)
    await db.collection('blogs').insertOne({
        title:data.title,
        hashtags:data.hashtags,
        content:data.content,
        likes:data.likes,
        userId:reqUser?._id
    })
    console.log("connected to DB")
    // console.log(data)
    // const blog=new Blog({
    //     title:data.title,
    //     hashTags:data.hashTags,
    //     content:data.content
    // })
    // const response=await blog.save()
    return NextResponse.json("Send")
}


export async function PATCH(req:NextRequest,res:NextResponse){
    const json=await req.json()
    const client =await clientPromise
    const db=client.db('Users')  
    const reqUser=await db.collection('users').findOne(json.user)
    await db.collection('blogs').updateOne({userId:reqUser?._id},{$push:{likes:reqUser}})
    return NextResponse.json("received")
}