import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { getUserById } from "@/service/userService/GetUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}}) {
   try {
    const userId=params.id;
    if(userId==null) 
        return sendError("Missing required parameter: id",400);

    const user=await getUserById(parseInt(userId));
    return NextResponse.json({data:user},{status:200});
   } catch (error) {
    
    if (error instanceof CommonErrorHandler) {
        return sendError(error.message, error.statusCode);
      }
      return sendError(
        "Some error occured while getting user",
        500,
      );
   }
}