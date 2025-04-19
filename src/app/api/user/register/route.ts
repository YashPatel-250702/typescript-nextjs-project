import { UserAlreadyExistsError } from "@/customErrors/UserAlreadyExistByError";
import { User } from "@/models/userModels/UserModel";
import { createUser } from "@/services/userService/UserService";
import { userDataValidation } from "@/validations/userValidation/UserDataValidation";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        console.log(" POST /api/user/register hit");
        const userData: User = await req.json();
        const result = userDataValidation.safeParse(userData);

        if (!result.success) {
          const errors: Record<string, string> = {};
          const fieldErrors = result.error.format();
        
          Object.entries(fieldErrors).forEach(([key, value]) => {

            if (typeof value === 'object' && '_errors' in value && Array.isArray(value._errors)) {
              errors[key] = value._errors[0];
            }
          });
        
          return NextResponse.json(errors, { status: 400 });
        }
        
        

        const userId: number = await createUser(userData);
        if (!userId) {
            return NextResponse.json(
                { error: "Some error occured while creating user"}
              , { status: 500 });
        }
        return NextResponse.json(
                {  message: "User created successfully"}
               ,{ status: 200 });


    } catch (error) {

      if(error instanceof UserAlreadyExistsError){
        console.error("User already exists", error);
        return NextResponse.json(
            { error: error.message}
          , { status: 400 });
      }

        console.error("Some error occured while creating user", error);
        return NextResponse.json(
            { error: "Some error occured while creating user"}
          , { status: 500 });
    }
}
