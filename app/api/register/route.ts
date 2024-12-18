import { connectMongoDb } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { User } from "../../../models/user";
import { generateToken } from "@/utils/generateToken";


export async function POST(req:Request){
    try {
        
        await connectMongoDb()
        
        const {firstName,lastName,phone, email,password}:IUser = await req.json()
        
        if(!firstName || !lastName || !email || !phone || !password){
            return NextResponse.json({message:'Fyll i alla fält'},{status:400})
        }
        
        const user = await User.exists({email}) as IUser | null
        
        if(user){
            return NextResponse.json({message:'E-postadressen finns redan'},{status:401})
        }
        
        const haschedPassword = await bcrypt.hash(password,10)
        
        const newUser = await User.create({firstName,lastName,phone,email,password:haschedPassword})
        
        const token = await generateToken(newUser._id)



        const responseData = {
            _id:newUser._id,
            firstName,
            lastName,
            phone,
            email,
            token
        }

        const response = NextResponse.json({message:'Ditt konto har skapats',responseData},{status:201})

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  
            maxAge: 60 * 60 * 24,  
        });

        return response

    } catch (error) {
     console.log((error as Error).message)   
    }
}