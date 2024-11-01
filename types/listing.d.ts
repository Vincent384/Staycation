type Listings = {
_id:string    
Listing:ListingProperty[]
}


type location = {
    adress:string,
    city:string,
    district:string,
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
    accessibilityImages:[],
    reviews:UserReview[],
    _id:string
}

type CreateListingProperty = {
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
    accessibilityImages:[],
}

type ReviewResponsData = {
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
    accessibilityImages:[],
    reviews:ReviewData[]
    _id:string
}

type ListingPropertyWithHost = ListingProperty & {
    hostName: string,
    hostAvatar: string,
}