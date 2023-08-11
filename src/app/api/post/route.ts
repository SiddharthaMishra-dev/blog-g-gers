import { NextResponse,NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import connectMongo from '../../../utils/connectMongo'
import Blog from "@/models/BlogModel";
import clientPromise from "@/utils/mongoClient";

export async function GET(req:NextRequest,res:NextResponse){
    const session=await getServerSession(req,res,authOptions)
    console.log(session)
    // if(session){
    //   return  NextResponse.json({
    //         content:"Session found"
    //     })
    // }else{
    //    return NextResponse.json({
    //         content:"No session found"
    //     })
    // }
    // console.log(req)
    return NextResponse.json("send")
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