import { NextResponse,NextRequest } from "next/server";
import connectMongo from '../../../utils/connectMongo'
import Blog from "@/models/BlogModel";

export async function GET(){
    const res=await fetch('https://jsonplaceholder.typicode.com/posts')
    const data=await res.json()
    console.log(data)
    return NextResponse.json(data)
}

export async function POST(req:NextRequest){
    console.log("connecting to mongodb")
    await connectMongo()
    console.log("connected to DB")
    const data=await req.json()
    console.log(data)
    const blog=new Blog({
        title:data.title,
        hashTags:data.hashTags,
        content:data.content
    })
    const response=await blog.save()
    return NextResponse.json(response)
}