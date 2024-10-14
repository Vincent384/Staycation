import { NextResponse } from "next/server";
import { connectMongoDb } from "@/libs/mongodb";
import { Listing } from "../../../models/property";


export async function GET(){
try {
    await connectMongoDb()

    const findProperty = await Listing.find()

    if(!findProperty){
        return NextResponse.json({message:"Did not find any property with that Id"},{status:404})
    }
    
    return NextResponse.json(findProperty,{status:200})
    
} catch (error) {
    console.error(error)  
    return NextResponse.json({ message: 'An error occurred', error:(error as Error).message }, { status: 500 });
   }
}

export async function POST(req:Request){
    try {
        await connectMongoDb()
    
        const { listingId } = await req.json()
    
        if(!listingId){
            return NextResponse.json({message:"Did not find any property with that Id"},{status:404})
        }
        
       const newList =  await Listing.create({listingId:listingId})

      
        return NextResponse.json(newList,{status:201})
        
    } catch (error) {
        console.error(error)  
        return NextResponse.json({ message: 'An error occurred', error:(error as Error).message }, { status: 500 });
       }
    }
    