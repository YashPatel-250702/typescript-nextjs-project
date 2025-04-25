import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { updateUserPassword } from "@/service/userService/ForgetPassword";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
   try {
      const {email,otp}=await req.json();
       if(!email||!otp){
         return sendError("Email and Otp is required",400);
       }
      
      const cookies = req.cookies;
      const otpData = cookies.get(email)?.value;
      if(!otpData){
        throw new CommonErrorHandler("Otp Expired Please Send again",400);
      }

      console.log("Data Is:"+otpData);
      const {userOtp,hashedPassword}=JSON.parse(otpData);

      if(userOtp!=otp){
        throw new CommonErrorHandler("Invalid Otp",400);
      }

      await updateUserPassword(email,hashedPassword);
      const cookie = serialize(email, '', {
            maxAge: 0
          });
      
      const response=NextResponse.json({message:"Password Updated SUccessfully"},{status:200});
      response.headers.set("Set-Cookie", cookie);
      return response
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message,error.statusCode);
        }
        return sendError("Some error occured while verifying otp",500);
        
    }
}