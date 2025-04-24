import { User } from "@/models/userModels/UserModel";
import { checkExistingUserById, updateUserById } from "./UserService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const updateUser = async (userId:number,user:User) => {
    const userCount=await checkExistingUserById(userId);
    if(userCount==0){
        throw new CommonErrorHandler("User Not found with id: "+userId,404);
    }
    const updatedUser=await updateUserById(userId,user);
    if(!updatedUser){
        throw new CommonErrorHandler("User Not updated with id: "+userId,500);
    }
    return updatedUser
};