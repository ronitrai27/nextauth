import {connect} from "@/Config/dbConfig"
import User from '@/models/userModal'
import {NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken"
connect()

// export async function POST(request: NextRequest){
//     // extract data from token
//    const userId =  await getDataFromToken(request)
//  const user = await User.findOne({_id: userId}).select("-password")
//  return NextResponse.json({
//     message: "User Found",
//     data: user
//  })

// }

export async function POST(request: NextRequest) {
   try {
     const userId = await getDataFromToken(request);
     if (!userId) throw new Error("Invalid user token");
 
     const user = await User.findOne({ _id: userId }).select("-password");
     if (!user) throw new Error("User not found");
 
     return NextResponse.json({
       message: "User Found",
       data: user,
     });
   } catch (error:any) {
     return NextResponse.json({
       message: error.message || "Something went wrong",
       data: null,
     }, { status: 401 }); 
   }
 }
 