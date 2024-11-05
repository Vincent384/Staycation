import { connectMongoDb } from "@/libs/mongodb"
import { Property } from "@/models/property"
import { NextResponse } from "next/server"

export async function GET(req:Request){
    try {
        await connectMongoDb()
    
        const url = new URL(req.url)
        const id = url.searchParams.get('id')
    
        const property = await Property.findOne({host:id})
    
        if(!property){
            return NextResponse.json({message:"Did not find any property with that Id"},{status:404})
        }
    
    
        const responseData = {
            title: property.title,
            description: property.description,
            images: property.images,
            location:property.location,
            price_per_night: property.price_per_night,
            available_dates: property.available_dates,
            maximum_guest: property.maximum_guest,
            house_rules: property.house_rules,
            facilities: property.facilities,
            accessibilityFeatures: property.accessibilityFeatures,
            distanceToNearestBus: property.distanceToNearestBus,
            accessibilityImages: property.accessibilityImages,
            reviews: property.reviews,
        };
        
        return NextResponse.json(responseData,{status:200})
        
    } catch (error) {
        console.error(error)  
        return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
       }
    }