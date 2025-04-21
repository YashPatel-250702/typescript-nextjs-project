 import { NextRequest, NextResponse } from "next/server";
 import { verifyJwt } from "./service/authService/JwtToken";



export default async function userAuthentication(req:NextRequest) {

    try {
        const { pathname } = req.nextUrl;
    const method=req.method;
    const header=req.headers.get("Authorization");
    if(!header){
        return NextResponse.json({error:"Header is missing"},{status:401});
    }

    const token=header.slice(7);
    if(!token){
        return NextResponse.json({error:"Token missing in request"},{status:401});
    }
    const {payload}=await verifyJwt(token);

    if(!payload){
        return NextResponse.json({error:"Inavlid token or token expired"},{status:401});
    }
    
    const role=payload.role;
    const isAdminRoute =
    (pathname.startsWith('/api/player') || pathname.startsWith('/api/team')) &&
    ['POST', 'PUT', 'DELETE'].includes(method);

    if(isAdminRoute && role!=='ADMIN'){
        return NextResponse.json({error:"User Dont have permission to access"},{status:403});
    }
    return NextResponse.next();
    } catch (error) {
        console.error("Something wrong in middleware: "+error);
        return new NextResponse('Unauthorized', { status: 401 });
        
    }

}
export const config = {
    matcher: [
      '/api/player/:path*',
      '/api/team/:path*',
    ],
  };
