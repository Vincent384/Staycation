import { NextResponse } from "next/server";
import { connectMongoDb } from "@/libs/mongodb";
import { Listing, Property} from "../../../models/property";
import { Host } from "../../../models/host";


export async function GET(req:Request){
try {
    await connectMongoDb()

    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    const property = await Property.findById(id).populate('host')

    if(!property){
        return NextResponse.json({message:"Did not find any property with that Id"},{status:404})
    }

    const hostAvatar = property.host?.avatar
    const hostName = property.host?.name

    const responseData = {
        title: property.title,
        description: property.description,
        images: property.images,
        hostName: hostName,
        hostAvatar: hostAvatar,
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


export async function POST(req:Request){
 try {

    await connectMongoDb()

    const {title,description,images,host,location,price_per_night,maximum_guest,house_rules,
        facilities,available_dates,accessibilityFeatures,distanceToNearestBus,accessibilityImages}
        :ListingProperty = await req.json()

    if(!title || !description || !images || !host || !location || 
        !price_per_night || !maximum_guest || !house_rules || !available_dates){
        return NextResponse.json({message:'Fyll i alla fälten'},{status:400})
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
        facilities:facilities,
        accessibilityFeatures:accessibilityFeatures,
        distanceToNearestBus: distanceToNearestBus,
        accessibilityImages: accessibilityImages,
        reviews:[]
    })

    const listingId = '670e44711445d7876123e5ce'

    const listing = await Listing.findById(listingId)

    if(!listing){
        return NextResponse.json({message:"No listing found with that id"},{status:404})
    }

    await newPoperty.save()


    listing.listings.push(newPoperty)

    await listing.save()

    const populatedPoperty = await Property.findById(newPoperty._id).populate('host')

    if(!populatedPoperty){
        return NextResponse.json({message:'Could not find the created Property'},{status:500})
    }

    return NextResponse.json({message:'Ny fastighet tillagd!',Property:populatedPoperty},{status:201})

 } catch (error) {
  console.log(error)  
  return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
 }
}


export async function PUT(req:Request):Promise<NextResponse>{
    try {
        await connectMongoDb()

        const {title,description,images,location,price_per_night,maximum_guest,house_rules,
            facilities,available_dates,propertyId,accessibilityFeatures,
            distanceToNearestBus,accessibilityImages} = await req.json()
    
        if(!title || !description || !images || !location || 
            !price_per_night || !maximum_guest || !house_rules || !available_dates || !propertyId){
            return NextResponse.json({message:'Please fill all the fields'},{status:401})
        }

    
        const updateProperty = {
            title:title,
            description:description,
            images:images,
            location:location,
            price_per_night:price_per_night,
            house_rules:house_rules,
            maximum_guest:maximum_guest,
            available_dates:available_dates,
            facilities:facilities,
            accessibilityFeatures:accessibilityFeatures,
            distanceToNearestBus: distanceToNearestBus,
            accessibilityImages: accessibilityImages
        }

        const property = await Property.findByIdAndUpdate(propertyId,updateProperty)

        if(!property){
            return NextResponse.json({message:"No listing found with that id"},{status:404})
        }

        return NextResponse.json({message:"Update Successful",updateProperty})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error:(error as Error).message},{status:500})
    }
}


export async function DELETE(res:Request){
    try {
        await connectMongoDb()

        const { propertyId }:{propertyId:string} = await res.json()

        if(!propertyId){
            return NextResponse.json({message:"Please provide an Id"},{status:400})
        }

        const findProperty = await Property.findByIdAndDelete(propertyId)

        if(!findProperty){
            return NextResponse.json({message:"Could not find any property with that ID"},{status:404})
        }

        const listId = findProperty.listingId
        const listing = await Listing.findByIdAndUpdate(
            {_id:listId},
            {$pull:{listings:{_id:propertyId}}},
        )

        if(!listing){
            return NextResponse.json({message:'Could not found the property in the list'})
        }

        return NextResponse.json({message:"Property Object is deleted"},{status:200})

    } catch (error) {
        
    }
}