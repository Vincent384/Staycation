type UserReview = {
    rating:string,
    comment:string,
    hostId:ObjectId,
    propertyId:ObjectId,
}

type ReviewData = UserReview & {
    hostId: HostData,
    createAt:String
}