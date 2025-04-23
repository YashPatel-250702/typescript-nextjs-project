import { User } from "@/models/userModels/UserModel";
import { CommonErrorHandler } from "@/customErrors/CommonError";
import { checkExistingUserByEmail, createNewUser } from "./UserService";
import { EmailModel } from "@/models/userModels/EmailModel";
import { sendMail } from "./EmailService";
import { AdminEmailMessage, NormalUserMailMessage } from "@/shared/constants/EmailMessageConstant";

export const createUser = async (userData: User) :Promise<number>=> {

    const exitingUserByEmailCount:number = await checkExistingUserByEmail(userData.email);
    if (exitingUserByEmailCount>0) {
        throw new CommonErrorHandler("User already exists by email: " + userData.email,400);
    }

    const userId:number=await createNewUser(userData);
    if(!userId) {
        throw new Error("User Not created with email: "+userData.email);
    }

    const emailModel:EmailModel={
        toEmail:userData.email,
        subject:"Registration Successfull",
        message:''

    }
    if(userData.role==="ADMIN") {
        emailModel.message=AdminEmailMessage(userData.name);
    }
    else{
        emailModel.message=NormalUserMailMessage(userData.name);
    }

    sendMail(emailModel);
    return userId;

   
};
