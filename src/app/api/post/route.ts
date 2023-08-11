import { NextResponse,NextRequest } from "next/server";
import connectMongo from '../../../utils/connectMongo'
import Blog from "@/models/BlogModel";
import clientPromise from "@/utils/mongoClient";

export async function GET(){
    const res=await fetch('https://jsonplaceholder.typicode.com/posts')
    const data=await res.json()
    console.log(data)
    return NextResponse.json(data)
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