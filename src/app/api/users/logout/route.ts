import {connect} from "@/Config/dbConfig"
// import User from '@/models/userModal'
import {NextRequest, NextResponse } from 'next/server'
// import bcryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"
connect()

export async function GET(request: NextRequest){
    try {
      const response =   NextResponse.json({
        message: "Logout Successfully",
        success: true
      })
        
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0)
      })

      return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}