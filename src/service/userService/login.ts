
import prisma from "@/lib/prism-client";
import bcrypt from "bcrypt";
import { generateToekn } from "../authService/JwtToken";
import { LoginResponse } from "@/response/LoginResponse";
import { CommonErrorHandler } from "@/customErrors/CommonError";
import { checkExistingUserByEmail, findUserByEmail } from "./UserService";
import { JwtPayload } from "@/shared/JwtPayload";
import { User } from "@/models/userModels/UserModel";


export const loginAndGenerateToken=async(email:string,password:string):Promise<LoginResponse>=>{

    const user=await findUserByEmail(email);

    if(!user){
        throw new CommonErrorHandler("User not found with email: "+email,404);
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
        throw new CommonErrorHandler("Invalid password",400);
    }
    try{
        const payload:JwtPayload={userId:user.id,role:user.role};
        const token:string= await generateToekn(payload);
        const tokenResponse:LoginResponse={
            userId:user.id,
            message:"Login successfully",
            token:token,
            role:user.role
        }
        return tokenResponse;
    }catch(error){
        throw new Error("Some error occured while generating token");
    }
   
}