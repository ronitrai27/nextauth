import {connect} from "@/Config/dbConfig"
import User from '@/models/userModal'
import {NextRequest, NextResponse } from 'next/server'
connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log("token from request:", token)

    const user =   await  User.findOne({verifyToken: token, 
        verifyTokenExpiry: {$gt: Date.now()}
      })

      if (!user){
        return NextResponse.json({error: "Invalid Token"},{status:400})
      }

      console.log("valid user", user)

      user.isVerified = true
      user.verifyToken = undefined
      user.verifyTokenExpiry = undefined

     await user.save()

     return NextResponse.json({message: "Email Verified!",
        success: true
     },{status:200})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}