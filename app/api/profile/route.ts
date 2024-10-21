import { User } from "@/models/user"
import { NextResponse } from "next/server"
import * as jwt from 'jsonwebtoken';
import { Host } from "@/models/host";



export async function GET(res:Request){
    try {
        
       const authHeader = res.headers.get('authorization')

       const token = authHeader?.split(' ')[1]
        
       const decoded = jwt.verify(token as string,process.env.SECRET_KEY as string) as {userId:string} 

        const findUser = await User.findById(decoded.userId)

        if(!findUser){
            return NextResponse.json({message:'User not found'},{status:404})
        }

        const getAvatar = await Host.findOne({userId:findUser._id})

        const avatar = getAvatar?.avatar


        console.log(getAvatar)

        const userProfile = {
            firstName:findUser.firstName,
            lastName:findUser.lastName,
            phone:findUser.phone,
            email:findUser.email,
            avatar:avatar
        }

        return NextResponse.json({message:'Successfully retrieved',userProfile},{status:200})

    } catch (error) {
        
    }
}