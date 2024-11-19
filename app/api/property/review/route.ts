import { connectMongoDb } from "@/libs/mongodb";
import { Property } from "@/models/property";
import Review from "@/models/review";
import { NextResponse } from "next/server";


export async function POST(res:Request){
    try {
        await connectMongoDb()

        const { rating, comment,hostId,propertyId,hostAvatar,hostName}: UserReview = await res.json()

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

        const responseData = {
            _id: newReview._id,
            comment: newReview.comment,
            rating:newReview.rating,
            createdAt: newReview.createdAt,
            hostId: {
                _id: hostId,
                name: hostName,
                avatar: hostAvatar,
            },
        };

        return NextResponse.json({message:'Review was created',responseData},{status:201})


    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
        
    }

}


export async function GET(req: Request) {
    try {
        await connectMongoDb();


        const url = new URL(req.url);
        const propertyId = url.searchParams.get("id")

        if (!propertyId) {
            return NextResponse.json({ message: 'propertyId is required' }, { status: 400 })
        }

 
        const findProperty = await Property.findOne({ _id: propertyId })
            .populate({
                path: 'reviews',
                model: 'Review',
                select: 'rating comment createdAt', 
                populate: {
                    path: 'hostId',
                    model: 'Host',
                    select: 'name avatar', 
                },
            });

        if (!findProperty) {
            return NextResponse.json({ message: 'Property not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Successfully retrieved', property: findProperty }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 })
    }
}