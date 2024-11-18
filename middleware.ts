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
    matcher: ['/dashboard/homes',
        '/dashboard/create-host-profile',
        '/dashboard',
        '/dashboard/change-host-profile',
        '/dashboard/create-listing',
        '/dashboard/change-listing',
        '/dashboard/change-profile',
    '/dashboard/message'],  
};