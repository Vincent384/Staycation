type UserReview = {
    rating:string,
    comment:string,
    hostId:ObjectId,
    propertyId:ObjectId
    hostAvatar:string , 
    hostName: string ,
}

type ReviewData = UserReview & {
    hostId: HostData,
    createAt:String
}