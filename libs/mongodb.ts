import mongoose from 'mongoose'


export const connectMongoDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI as string)
        console.log('Connected to MongoDb')
    } catch (error) {
        console.log(error)
    }
}


