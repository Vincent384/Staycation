import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema<IUser>({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
},{timestamps:true})

const User = mongoose.models.User || mongoose.model('User',userSchema)

export {User}