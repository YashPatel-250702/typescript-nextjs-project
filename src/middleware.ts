import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./services/authService/JwtToken";

export async function userAuthentication(token:string,role: string) {
  try {

    if (!token) {
      return NextResponse.json(
        { error: "Token is missing in Authorization header." },
        { status: 401 }
      );
    }

    const {payload} = await verifyJwt(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 401 }
      );
    }

    if(payload.role as string !== role) {
        return NextResponse.json(
            { error: "You are not authorized to access this resource." },
            { status: 403 }
          );
        
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed." },
      { status: 401 }
    );
  }
}
