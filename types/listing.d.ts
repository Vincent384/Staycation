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
    maximum_guest:string,
    house_rules:string[],
    facilities:string[],
    listingId:string,
    accessibilityFeatures:string[],
    distanceToNearestBus:string,
    accessibilityImages:string[],
    reviews:UserReview[],
    _id:string
}

type CreateListingProperty = {
    title:string,
    description:string,
    images:string[],
    host:string,
    location:location,
    price_per_night:string | number,
    available_dates: string[],
    maximum_guest:string,
    house_rules:string[],
    facilities:string[],
    accessibilityFeatures:string[],
    distanceToNearestBus:string,
    accessibilityImages:string[],
}

type ChangeListingProperty = {
    title:string,
    description:string,
    images:string[],
    propertyId:string,
    location:location,
    price_per_night:string | number,
    available_dates: string[],
    maximum_guest:string,
    house_rules:string[],
    facilities:string[],
    accessibilityFeatures:string[],
    distanceToNearestBus:string,
    accessibilityImages:string[],
}

type CreateListingPropertyErrors = {
    title:string,
    description:string,
    images:string,
    host:string,
    location:location,
    price_per_night:string,
    available_dates: string,
    maximum_guest:string,
    house_rules:string,
    facilities:string,
    accessibilityFeatures:string,
    distanceToNearestBus:string,
    accessibilityImages:string,
}

type ChangeListingPropertyErrors = {
    title:string,
    description:string,
    images:string,
    propertyId:string,
    location:location,
    price_per_night:string,
    available_dates: string,
    maximum_guest:string,
    house_rules:string,
    facilities:string,
    accessibilityFeatures:string,
    distanceToNearestBus:string,
    accessibilityImages:string,
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

type PropertyType = {
    _id: string
    title: string
    description: string
    images: string[]
    location: {
      city: string
      district: string
    }
    price_per_night: number
    maximum_guest: number
    house_rules: string[]
    available_dates: string[]
    facilities?: string[]
    accessibilityFeatures?: string[]
    distanceToNearestBus?: number
    accessibilityImages?: string[]
  }
  
  type ListingType = {
    _id: string
    listings: PropertyType[] 
  }
  