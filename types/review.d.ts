type UserReview = {
    rating:number,
    comment:string,
    hostId:ObjectId,
    propertyId:ObjectId,
}

type ReviewData = UserReview & {
    hostId: HostData,
    createAt:String
}