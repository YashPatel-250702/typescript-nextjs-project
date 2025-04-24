import { User } from "@/models/userModels/UserModel";
import { findUserById } from "./UserService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const getUserById=async(userId:number):Promise<User>=>{
    const user:User|null=await findUserById(userId);
    if(user==null){
        throw new CommonErrorHandler("User not found with id: "+userId,404);
    }
    return user;
}