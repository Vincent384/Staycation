import mongoose, { Schema } from 'mongoose'



const reviewSchema = new Schema({
    rating:{type:String,required:true},
    comment:{type:String,required:true},
    hostId:{type:mongoose.Schema.Types.ObjectId,ref:'Host'},
    propertyId:{type:mongoose.Schema.Types.ObjectId,ref:'Property'},
},{timestamps:true})

const Review = mongoose.models.Review || mongoose.model('Review',reviewSchema)

export default Review