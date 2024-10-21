import { connectMongoDb } from "@/libs/mongodb";
import { Property } from "@/models/property";
import Review from "@/models/review";
import { NextResponse } from "next/server";


export async function POST(res:Request){
    try {
        await connectMongoDb()

        const { rating, comment,hostId,propertyId}: UserReview = await res.json()

        if(!rating || !comment || !hostId || !propertyId){
            return NextResponse.json({message:'Please fill all required fields'},{status:400})
        }

        const newReview = new Review ({
            rating:rating,
            comment:comment,
            propertyId:propertyId,
            hostId:hostId
        })

        const property = await Property.findOne({_id:propertyId})

        if(!property){
            return NextResponse.json({message:'Property not found'},{status:404})
        }

        await newReview.save()

        property.reviews.push(newReview._id)

        await property.save()

        return NextResponse.json({message:'Review was created',newReview},{status:201})


    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
        
    }

}