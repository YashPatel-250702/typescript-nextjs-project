import { InvalidPasswordError } from "@/customErrors/InavlidPasswordError";
import { UserNotFoundError } from "@/customErrors/UserNotFOundError";
import { sendError } from "@/response/error";
import { LoginResponse } from "@/response/LoginResponse";
import { loginAndGenerateToken } from "@/service/userService/login";
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
            return sendError(
                error.message ,
                404
           )
        }
        
        if(error instanceof InvalidPasswordError){
            return sendError(
                 error.message ,
                 400 
            )
        }

        console.error("Error occured while login",error);
        return sendError(
            "Some error occured while login" ,
             500 );
        
    }
}
