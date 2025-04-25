import { CommonErrorHandler } from "@/customErrors/CommonError";
import { findUserByEmail, updatePassword } from "./UserService";
import { EmailModel } from "@/models/userModels/EmailModel";
import { sendMail } from "./EmailService";
import { ForgotPasswordOtpMailMessage } from "@/shared/constants/EmailMessageConstant";
import bcrypt from "bcrypt";

export const sendPassworResetMail = async (email: string,password:string, otp:string) => {
    const user = await findUserByEmail(email);
    if (!user||user == null) {
      throw new CommonErrorHandler("User not found with email: " + email, 404);
    }
    const isSamePassword:boolean=await bcrypt.compare(password,user.password);
    if(isSamePassword){
      throw new CommonErrorHandler("Password can not be same as old password",400);
    }

    const emailModel:EmailModel={
      toEmail:email,
      subject:"Password Reset OTP",
      message:ForgotPasswordOtpMailMessage(user.name,otp)
    }
   await sendMail(emailModel);
  };
 
export const updateUserPassword=async(email:string,password:string)=>{
    const user=await findUserByEmail(email);
    if(!user){
        throw new CommonErrorHandler("User not found with email: "+email,404);
    }
    const updatedPassword=await updatePassword(email,password);
    if(!updatedPassword){
        throw new CommonErrorHandler("Unable to update password",500);
    }
    return updatedPassword
    
} 