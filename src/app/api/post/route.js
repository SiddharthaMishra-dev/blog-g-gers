import { NextResponse,NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import connectMongo from '../../../utils/connectMongo'
import clientPromise from "@/utils/mongoClient";
import { getSession } from "next-auth/react";

export async function GET(req,res){
    const session = await getServerSession(authOptions)
    // console.log(session)
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
    const client= await clientPromise
    const db=client.db('Users')
    const reqUser=await db.collection('users').findOne(session.user)
    const reqBlogs=await db.collection('blogs').find({"userId":reqUser?._id}).toArray()
    console.log(reqBlogs)
    return NextResponse.json(reqBlogs)
}

export async function POST(req){
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