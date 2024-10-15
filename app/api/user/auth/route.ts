import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { connectMongoDb } from "@/libs/mongodb";


export async function PUT(req:Request):Promise<NextResponse>{
    try {
        await connectMongoDb()
     
        const {password,userId}: {password:string,userId:string} = await req.json()

        if(!userId || !password){
            return NextResponse.json({message:'Please provide userId and password'},{status:401})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const findUserAndUpdate = await User.findByIdAndUpdate(userId,{password:hashedPassword})

        if(!findUserAndUpdate){
            return NextResponse.json({message:'User not found'},{status:404})
        }

        return NextResponse.json({message:'Password updated successfully'},{status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:(error as Error).message})
    }
}