import { User } from "@/models/userModels/UserModel";
import { UserAlreadyExistsError } from "@/customErrors/UserAlreadyExistByError";
import { checkExistingUserByEmail, createNewUser } from "./UserService";

export const createUser = async (userData: User) => {

    const exitingUserByEmail = await checkExistingUserByEmail(userData.email);
    if (exitingUserByEmail) {
        throw new UserAlreadyExistsError("User already exists by email: " + userData.email);
    }

    const userId=await createNewUser(userData);
    if(!userId) {
        throw new Error("User Not created with email: "+userData.email);
    }
    return userId;

   
};
