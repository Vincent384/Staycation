import { NextResponse } from "next/server"
import { User } from "../../../models/user"
import bcrypt from 'bcryptjs'
import { connectMongoDb } from "@/libs/mongodb"



export async function POST(res:Request){
    try {

        await connectMongoDb()

    const { email, password }:Login = await res.json()

    if(!email || !password){
        return NextResponse.json({message:'Please fill all the fields'},{status:400})
    }

    const user = await User.findOne({email})

    if(!user){
        return NextResponse.json({message:'Unauthorized'},{status:401})
    }

    const compareUser = await bcrypt.compare(password,user.password)

    if(!compareUser){
        return NextResponse.json({message:'Unauthorized'},{status:401})
    }

    const responsUserData = {
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email
    }

    return NextResponse.json(responsUserData,{status:200})

    } catch (error) {
        console.error(error)
        return NextResponse.json({error:(error as Error).message},{status:500})
    }

}