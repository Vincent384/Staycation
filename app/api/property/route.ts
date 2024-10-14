import { NextResponse } from "next/server";
import { connectMongoDb } from "@/libs/mongodb";
import { Listing, Property} from "../../../models/property";
import { Host } from "../../../models/host";


export async function GET(req:Request){
try {
    await connectMongoDb()

    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    const findProperty = await Property.findById(id)

    if(!findProperty){
        return NextResponse.json({message:"Did not find any property with that Id"},{status:404})
    }
    
    return NextResponse.json(findProperty,{status:200})
    
} catch (error) {
    console.error(error)  
    return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
   }
}


export async function POST(req:Request){
 try {

    await connectMongoDb()

    const {title,description,images,host,location,price_per_night,maximum_guest,house_rules,
        facilities,available_dates,listingId} = await req.json()

    if(!title || !description || !images || !host || !location || 
        !price_per_night || !maximum_guest || !house_rules || !available_dates || !listingId){
        return NextResponse.json({message:'Please fill all the fields'},{status:401})
    }

    const findHost = await Host.findById(host)

    if(!findHost){
        return NextResponse.json({message:'Could not find that Host'},{status:500})
    }

    const newPoperty = new Property({
        title:title,
        description:description,
        images:images,
        host:host,
        location:location,
        price_per_night:price_per_night,
        house_rules:house_rules,
        maximum_guest:maximum_guest,
        available_dates:available_dates,
        facilities:facilities
    })

    await newPoperty.save()

    const listing = await Listing.findById(listingId)

    if(!listing){
        return NextResponse.json({message:"No listing found with that id"},{status:404})
    }

    listing.listings.push(newPoperty)

    await listing.save()

    const populatedPoperty = await Property.findById(newPoperty._id).populate('host')

    if(!populatedPoperty){
        return NextResponse.json({message:'Could not find the created Property'},{status:500})
    }

    return NextResponse.json({message:'A new Property was created',Property:populatedPoperty},{status:201})

 } catch (error) {
  console.log(error)  
  return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
 }
}