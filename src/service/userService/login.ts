import { UserNotFoundError } from "@/customErrors/UserNotFOundError";
import prisma from "@/lib/prism-client";
import bcrypt from "bcrypt";
import { generateToekn } from "../authService/JwtToken";
import { LoginResponse } from "@/response/LoginResponse";
import { InvalidPasswordError } from "@/customErrors/InavlidPasswordError";
import { checkExistingUserByEmail } from "./UserService";
import { JwtPayload } from "@/shared/JwtPayload";
import { User } from "@/models/userModels/UserModel";


export const loginAndGenerateToken=async(email:string,password:string):Promise<LoginResponse>=>{

    const user=await checkExistingUserByEmail(email);

    if(!user){
        throw new UserNotFoundError("User not found with email: "+email);
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
        throw new InvalidPasswordError("Invalid password");
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