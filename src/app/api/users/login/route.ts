import {connect} from "@/Config/dbConfig"
import User from '@/models/userModal'
import {NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs"
// import { sendEmail } from "@/helpers/mailer"
import jwt from "jsonwebtoken"
connect()

export async function POST(request: NextRequest){
    try {
        const reqBody  = await request.json()
        const { email, password} = reqBody
        // validation
        // console.log("DATA from user:",reqBody);
      const user =   await User.findOne({email})
      if (!user){
        return NextResponse.json({error:"Email NOt Found"}, {status: 400})
      }
      console.log("Login User", user)

    const validPassword  = await  bcryptjs.compare(password, user.password)

    if(!validPassword){
        return NextResponse.json({error:"Check your Password"}, {status: 400})
    }

    const tokenData = {
        id: user._id,
        username: user.username,
        // email: user.email
    }

  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn : "1d"})

  const response  = NextResponse.json({
    message: "Logged in success",
    success: true
  })

  response.cookies.set("token", token, {
    httpOnly: true
  })

  return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}