import { CommonErrorHandler } from "@/customErrors/CommonError";

import { updateUser } from "@/service/userService/UpdateUser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserDataValidation } from "@/validations/UserDataValidation";
import { sendValidationResponse } from "@/response/ValidationResponse";
import { sendError } from "@/customErrors/error";
export async function PUT(re:NextRequest,{params}:{params:{id:string}}):Promise<NextResponse> {
   try {
     const userId=params.id;
     if(userId==null){
        return sendError("Missing required parameter: id",400);
     }

     const user=await re.json();
      const validatedData = UserDataValidation.safeParse(user);
     
         if (!validatedData.success) {
           return sendValidationResponse(validatedData);
         }
     if(user.password){
        user.password=await bcrypt.hash(user.password,10);
     }
     const updatedUser=await updateUser(parseInt(userId),user)
     return NextResponse.json(
        {message:"User Updated Successfully",data:updatedUser},
        {status:200});
   } catch (error) {
    
    if (error instanceof CommonErrorHandler) {
        return sendError(error.message, error.statusCode);
      }
      return sendError(
        "Some error occured while updating user",
        500,
      );    
    
   }   
}