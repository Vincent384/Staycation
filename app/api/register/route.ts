import { connectMongoDb } from "@/libs/mongodb";
import { NextResponse } from "next/server";

import bcrypt from 'bcryptjs'
import { User } from "../../../models/user";


export async function POST(req:Request){
    try {
        
        await connectMongoDb()
        
        const {firstName,lastName,phone, email,password}:User = await req.json()
        
        if(!firstName || !lastName || !email || !phone || !password){
            return NextResponse.json({message:'Please fill all fields required bajs'},{status:400})
        }
        
        const findEmail = await User.exists({email})
        
        if(findEmail){
            return NextResponse.json({message:'There is already an account with this email'},{status:401})
        }
        

        const haschedPassword = await bcrypt.hash(password,10)

        const newContact = await User.create({firstName,lastName,phone,email,password:haschedPassword})



        return NextResponse.json({message:'Account created',newContact},{status:201})

    } catch (error) {
     console.log((error as Error).message)   
    }
}