import mongoose, { Schema } from 'mongoose'



const hostSchema = new Schema({
    name:{type:String,required:true},
    avatar:{type:String,required:false},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true})

const Host = mongoose.models.Host || mongoose.model('Host',hostSchema)

export {Host}