type Listings = {
_id:string    
Listing:Listing[]
}


type location = {
    adress:string,
    city:string,
    country:string,
    _id:string
}


type Listing = {
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
    _id:string
}