import { connectMongoDb } from "@/libs/mongodb";
import { NextResponse } from "next/server";

import { Host } from "../../../../models/host";
import { User } from "../../../../models/user";





export async function POST(req:Request):Promise<NextResponse>{
    try {
        await connectMongoDb()

        const {name,avatar,userId} :Host = await req.json()

        if(!name || !avatar || !userId){
            return NextResponse.json({message:'Please fill all the fields'},{status:400})
        }

        const findUser = await User.findById(userId)
       
        if(!findUser){
            return NextResponse.json({message:'Could not find that user'},{status:500})
        }

        const newHost = new Host({
            name:name,
            avatar:avatar,
            userId:userId
        })
        await newHost.save()
        

        const populatedHost = await Host.findById(newHost._id).populate('userId')
    
        if (!populatedHost) {
            return NextResponse.json({ message: 'Could not find the created host' }, { status: 404 });
        }

        console.log(populatedHost)
        return NextResponse.json({message:'Created a host',host:populatedHost},{status:201})
        


    } catch (error) {
        console.error('Error post Host',error)
        return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
    }
}


export async function PUT(req:Request):Promise<NextResponse>{
    try {
        await connectMongoDb()
        
        const {name,avatar,hostId} = await req.json()

        if(!name || !avatar || !hostId){
            return NextResponse.json({message:'Please fill all the fields'},{status:400})
        }


        const updateHost = {
            name:name,
            avatar:avatar
        }

        const findUserAndUpdate = await Host.findByIdAndUpdate(hostId,updateHost)
        
        console.log(updateHost)
        console.log(findUserAndUpdate)
        
        if(!findUserAndUpdate){
            return NextResponse.json({message:'Could not find that user'},{status:500})
        }
        
        return NextResponse.json({message:'Update successful',updated:updateHost},{status:200})


    } catch (error) {   
        console.log(error)
        return NextResponse.json({error:(error as Error).message},{status:500})
    }

}