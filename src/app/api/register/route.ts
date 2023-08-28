// import { NextResponse,NextRequest } from "next/server";
// import connectMongo from '../../../utils/connectMongo'
// import {User} from "@/models/UserModel";

// export async function POST(req:NextRequest){
//     console.log("connecting to mongodb")
//     await connectMongo()
//     console.log("connected to DB")
//     const data=await req.json()
//     console.log(data)
//     const user=new User({
//         userName:data.userName,
//         password:data.password,
//     })
//     const response=await user.save()
//     return NextResponse.json(response)
// }
