import { User } from "@/models/userModels/UserModel";
import prisma from "@/lib/prism-client";

export const checkExistingUserByEmail = async (
    email: string,
): Promise<number> => {
    const count = await prisma.user.count({
        where: { email: email },
    });
    return count;
};
export const createNewUser = async (userData: User): Promise<number> => {
    const user = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role,
        },
    });
    return user.id;
};

export const findUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    return user;
};
export const checkExistingUserById = async (
    id: number,
): Promise<number> => {
    const count = await prisma.user.count({
        where: { id: id },
    });
    return count;
};
export const updateUserById=async(userId:number,user:User):Promise<User>=>{
    const updatedUser=await prisma.user.update({
        where:{id:userId},
        data:user
    })
    return updatedUser;
}