import { NextResponse } from "next/server";
import { connectMongoDb } from "@/libs/mongodb";
import { Listing } from "../../../models/property";


export async function GET(){
try {
    await connectMongoDb()

    const findProperty = await Listing.find()

    if(!findProperty){
        return NextResponse.json({message:"Hittade ingen egendom med det angivna ID"},{status:404})
    }
    
    return NextResponse.json(findProperty,{status:200})
    
} catch (error) {
    console.error(error)  
    return NextResponse.json({ message: 'Ett fel inträffade', error:(error as Error).message }, { status: 500 });
   }
}

export async function POST(req:Request){
    try {
        await connectMongoDb()
    
        const { listingId }:{listingId:string} = await req.json()
    
        if(!listingId){
            return NextResponse.json({message:"Hittade ingen egendom med det angivna ID"},{status:404})
        }
        
       const newList =  await Listing.create({listingId:listingId})

      
        return NextResponse.json(newList,{status:201})
        
    } catch (error) {
        console.error(error)  
        return NextResponse.json({ message: 'Ett fel inträffade', error:(error as Error).message }, { status: 500 });
       }
    }
    