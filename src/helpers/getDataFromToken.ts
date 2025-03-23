import {NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken"

export const getDataFromToken = (request: NextRequest) => {
    try {
      const toekn =  request.cookies.get("token")?.value || ""

     const decodedToken:any =  jwt.verify(toekn, process.env.TOKEN_SECRET!)

     return decodedToken.id
    } catch (error: any) {
        throw new Error(error.message)
        
    }
}