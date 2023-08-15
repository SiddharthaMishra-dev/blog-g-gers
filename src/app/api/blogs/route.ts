import { NextRequest , NextResponse } from "next/server";
import clientPromise from "@/utils/mongoClient";
export async function GET(req:NextRequest,res:NextResponse){
    const client=await clientPromise
    const db=client.db('Users')
    const reqRes=await db.collection('blogs').find().toArray()
    return NextResponse.json(reqRes)
}

export async function PATCH(req:NextRequest,res:NextResponse){
    const client=await clientPromise;
    const json=await req.json()
    console.log(json)
    return NextResponse.json("received")
}