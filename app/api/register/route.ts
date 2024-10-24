import { connectMongoDb } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { User } from "../../../models/user";
import { generateToken } from "@/utils/generateToken";


export async function POST(req:Request){
    try {
        
        await connectMongoDb()
        
        const {firstName,lastName,phone, email,password,birthday}:IUser = await req.json()
        
        if(!firstName || !lastName || !email || !phone || !password || !birthday){
            return NextResponse.json({message:'Please fill all fields required'},{status:400})
        }
        
        const user = await User.exists({email}) as IUser | null
        
        if(user){
            return NextResponse.json({message:'Unautherized'},{status:401})
        }
        
        const haschedPassword = await bcrypt.hash(password,10)
        
        const newUser = await User.create({firstName,lastName,phone,email,password:haschedPassword})
        
        const token = await generateToken(newUser._id)



        const responseData = {
            firstName,
            lastName,
            phone,
            email,
            birthday,
            token
        }

        return NextResponse.json({message:'Account created',responseData},{status:201})

    } catch (error) {
     console.log((error as Error).message)   
    }
}