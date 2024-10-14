import mongoose, { Schema } from 'mongoose'


const locationSchema = new Schema({
    adress:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true}
})

const reviewSchema = new Schema({
    author:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
    date:{type:Date,default:Date.now}
})

const propertySchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    images:[{type:String,required:true}],
    host:{type:mongoose.Schema.Types.ObjectId,ref:'Host'},
    location:locationSchema,
    price_per_night:{type:Number,required:true},
    available_dates:[{type:String,required:true}],
    maximum_guest:{type:Number,required:true},
    house_rules:[{type:String,required:true}],
    facilities:[{type:String,default:[]}]
})

const listingSchema = new Schema({
    listingId:{type:String},
    listings:[propertySchema]
})

const Review = mongoose.models.Review || mongoose.model('Review',reviewSchema)


const Property = mongoose.models.Property || mongoose.model('Property',propertySchema)
const Listing = mongoose.models.Listing || mongoose.model('Listing',listingSchema)

export {Property,Listing}