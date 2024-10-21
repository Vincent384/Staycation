import mongoose,{ Schema } from "mongoose";


const citySchema = new Schema({
    cityName:{type:String,required:true},
    cityImage:{type:String,required:true},
})


const City = mongoose.models.City || mongoose.model('City',citySchema)


export default City