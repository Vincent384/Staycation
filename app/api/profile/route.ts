import { User } from "@/models/user"
import { NextResponse } from "next/server"
import * as jwt from 'jsonwebtoken';
import { Host } from "@/models/host";



export async function GET(res:Request){
    try {
        
        const url = new URL(res.url)
        const userId = url.searchParams.get('userId')

        const findUser = await User.findById(userId)

        if(!findUser){
            return NextResponse.json({message:'User not found'},{status:404})
        }

        const getAvatar = await Host.findOne({userId:findUser._id})

        const avatar = getAvatar?.avatar
        const hostName = getAvatar.name


        console.log(getAvatar)

        const userProfile = {
            firstName:findUser.firstName,
            lastName:findUser.lastName,
            phone:findUser.phone,
            email:findUser.email,
            avatar:avatar,
            name:hostName
        }

        return NextResponse.json({message:'Successfully retrieved',userProfile},{status:200})

    } catch (error) {
        
    }
}