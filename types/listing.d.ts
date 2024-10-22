type Listings = {
_id:string    
Listing:ListingProperty[]
}


type location = {
    adress:string,
    city:string,
    country:string,
    _id:string
}


type ListingProperty = {
    title:string,
    description:string,
    images:string[],
    host:string,
    location:location,
    price_per_night:number,
    available_dates: string[],
    maximum_guest:number,
    house_rules:string[],
    facilities:string[],
    listingId:string,
    accessibilityFeatures:string[],
    distanceToNearestBus:string,
    accessibilityImages:[]
    _id:string
}