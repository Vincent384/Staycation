import { NextResponse } from "next/server"
import { User } from "../../../models/user"
import bcrypt from 'bcryptjs'
import { connectMongoDb } from "@/libs/mongodb"
import { generateToken } from "@/utils/generateToken"



export async function POST(res:Request){
    try {

        await connectMongoDb()

    const { email, password }:Login = await res.json()

    if(!email || !password){
        return NextResponse.json({message:'Fyll i alla fält'},{status:400})
    }

    const user = await User.findOne({email})

    if(!user){
        return NextResponse.json({message:'E-post eller lösenord stämmer inte'},{status:401})
    }

    const compareUser = await bcrypt.compare(password,user.password)

    if(!compareUser){
        return NextResponse.json({message:'E-post eller lösenord stämmer inte'},{status:401})
    }

    const token = await generateToken(user._id)

    console.log(token)

    const responseData = {
        id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        token:token
    }

    const response = NextResponse.json({message:'Inloggning lyckades',responseData},{status:200})

    response.cookies.set('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge:60*60*24
    })

    return response

    } catch (error) {
        console.error(error)
        return NextResponse.json({error:(error as Error).message},{status:500})
    }

}