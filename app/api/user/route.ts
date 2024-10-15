import { connectMongoDb } from "@/libs/mongodb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";


export async function PUT(req:Request):Promise<NextResponse>{
    try {
        
        await connectMongoDb()

        const {firstName,lastName,phone,email,userId}:UpdateUser = await req.json()

        const updateUser = {
            firstName:firstName,
            lastName:lastName,
            phone:phone,
            email:email,
        }

        const findUserAndUpdate = await User.findByIdAndUpdate(userId,updateUser)
        
        if(!findUserAndUpdate){
            return NextResponse.json({message:'Could not find the User'},{status:404})
        }

        return NextResponse.json({message:'Update User successful',updateUser})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:(error as Error).message})
    }
}

export async function DELETE(req:Request):Promise<NextResponse>{
    try {
        
        await connectMongoDb()

        const {userId}:{userId:string} = await req.json()

        const findUserAndUpdate = await User.findByIdAndDelete(userId)
        
        if(!findUserAndUpdate){
            return NextResponse.json({message:'Could not find the User'},{status:404})
        }

        return NextResponse.json({message:'Delete User successful'})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:(error as Error).message})
    }
}