import { User } from "@/models/userModels/UserModel";
import prisma from "@/lib/prism-client";
import { UserAlreadyExistsError } from "@/customErrors/UserAlreadyExistByError";


export const checkExistingUserByEmail = async (email: string)=> {
    const user = await prisma.user.findUnique({
        where: { email: email },
    }); 
   return user;
}
export const createNewUser = async (userData: User): Promise<number> => {
    const user = await prisma.user.create({
        data: {
            name:userData.name,
            email:userData.email,
            password:userData.password,
            role:userData.role
        }
    });
    return user.id;
};


