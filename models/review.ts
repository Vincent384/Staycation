import mongoose, { Schema } from 'mongoose'



const reviewSchema = new Schema({
    author:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
    date:{type:Date,default:Date.now}
},{timestamps:true})

const Review = mongoose.models.Review || mongoose.model('Review',reviewSchema)

export default Review