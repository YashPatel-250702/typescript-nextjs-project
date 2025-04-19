import { InvalidPasswordError } from "@/customErrors/InavlidPasswordError";
import { UserNotFoundError } from "@/customErrors/UserNotFOundError";
import { LoginResponse } from "@/response/LoginResponse";
import { loginAndGenerateToken } from "@/services/userService/login";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {

    try {  
       const {email,password}:{email:string,password:string}=await req.json();
       
       if(!email || !password){
        return NextResponse.json(
            {error:"Email and password are required"},
            {status:400});
       }

       const token:LoginResponse=await loginAndGenerateToken(email,password);

       return NextResponse.json({token});
    
        
    } catch (error) {

        if(error instanceof UserNotFoundError){
            return NextResponse.json(
                { error: error.message },
                { status: 404 }
            )
        }
        
        if(error instanceof InvalidPasswordError){
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        console.error("Error occured while login",error);
        return NextResponse.json(
            { error: "Some error occured while login" },
            { status: 500 });
        
    }
}
