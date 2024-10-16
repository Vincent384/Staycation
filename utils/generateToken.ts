import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';


export async function generateToken(id:ObjectId){
    const token = jwt.sign({userId:id},(process.env.SECRET_KEY as string),{expiresIn:'1h'})
    return token
}