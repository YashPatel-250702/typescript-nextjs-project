import { User } from "@/models/userModels/UserModel";
import { UserAlreadyExistsError } from "@/customErrors/UserAlreadyExistByError";
import { checkExistingUserByEmail, createNewUser } from "./UserService";
import { EmailModel } from "@/models/userModels/EmailModel";
import { sendMail } from "./EmailService";

export const createUser = async (userData: User) :Promise<number>=> {

    const exitingUserByEmail = await checkExistingUserByEmail(userData.email);
    if (exitingUserByEmail) {
        throw new UserAlreadyExistsError("User already exists by email: " + userData.email);
    }

    const userId=await createNewUser(userData);
    if(!userId) {
        throw new Error("User Not created with email: "+userData.email);
    }

    if(userData.role==="ADMIN") {
        const emailModel: EmailModel = {
            toEmail: userData.email,
            subject: "Welcome to Mufasa – Registration Successful!",
            message: `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h1 style="color: #1e88e5;">Welcome to Mufasa! 🦁</h1>
                <p>Hi ${userData.name || 'there'},</p>
                <p>We're excited to welcome you to <strong>Mufasa – Teams and Player Management System</strong>!</p>
                <p>Your registration was successful, and you're now ready to start managing teams and players with ease.</p>
                <p>As part of the Mufasa platform, you can now:</p>
                <ul>
                  <li>Create and manage your teams</li>
                  <li>Add, edit, or remove players</li>
                  <li>Assign players to specific teams</li>
                  <li>Track player stats and performance</li>
                  <li>Maintain an organized and efficient team structure</li>
                </ul>
                <p>If you have any questions or need help getting started, feel free to reach out to our support team.</p>
                <p>Thank you for choosing Mufasa. Let's build great teams together!</p>
                <br/>
                <p>Best regards,<br/><strong>The Mufasa Team</strong></p>
              </div>
            `,
          };
          
        sendMail(emailModel);
    }
    return userId;

   
};
