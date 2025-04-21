import { UserAlreadyExistsError } from "@/customErrors/UserAlreadyExistByError";
import { User } from "@/models/userModels/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { createUser } from "@/service/userService/Register";
import { sendError } from "@/response/error";
import { UserDataValidation } from "@/validations/UserDataValidation";
import { record } from "zod";
import { sendValidationResponse } from "@/response/ValidationResponse";

export async function POST(req: NextRequest):Promise<NextResponse>  {
    try {

        const userData: User = await req.json();
       const validatedData= UserDataValidation.safeParse(userData);

       if(!validatedData.success){
         return sendValidationResponse(validatedData);
       }
      
       
        userData.role = userData.role?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER";
        userData.password = await bcrypt.hash(userData.password, 10);

        const userId: number = await createUser(userData);
        return NextResponse.json(
                {  message: "User created successfully"}
               ,{ status: 200 });
    } catch (error) {

      if(error instanceof UserAlreadyExistsError){
         console.error("User already exists", error);
         return sendError( error.message , 400 )
        }

        console.error("Some error occured while creating user", error);
        return sendError(
           "Some error occured while creating user"
          , 500 );
    }
    
}

