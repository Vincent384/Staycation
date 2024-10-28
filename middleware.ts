import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from 'jose'



export async function middleware(req:NextRequest){

    const token = req.cookies.get('token')?.value;

    if(!token){
        return NextResponse.redirect(new URL('/login',req.url))
    }

    try {
        
        const secret = new TextEncoder().encode(process.env.SECRET_KEY)
        const { payload } = await jwtVerify(token,secret)

        return NextResponse.next()

    } catch (error) {
        
        return NextResponse.redirect(new URL('/login',req.url))
    }

}

export const config = {
    matcher: ['/profile','/create-host-profile','/dashboard'],  
};