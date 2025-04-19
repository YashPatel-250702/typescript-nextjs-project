import { User } from "@/models/userModels/UserModel";
import prisma from "@/lib/prism-client";
import { UserAlreadyExistsError } from "@/customErrors/UserAlreadyExistByError";

export const createUser = async (userData: User): Promise<number> => {
    const exitingUserByEmail = await prisma.user.findUnique({
        where: { email: userData.email },
    });
    if (exitingUserByEmail) {
        throw new UserAlreadyExistsError("User already exists by email: " + userData.email);
    }

    const user = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role ?? "USER",
        },
    });
    return user.id;
};
