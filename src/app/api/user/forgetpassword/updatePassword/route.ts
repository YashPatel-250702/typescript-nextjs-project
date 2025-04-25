import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendPassworResetMail } from "@/service/userService/ForgetPassword";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return sendError("Email and password are required", 400);
    }

    const userOtp: string = generateOtp();
    if (!userOtp) {
      throw new Error("Unable to send OTP at this time");
    }

    const regex=/(?=.*[a-z])(?=[A-Z])(?=.*[^a-zA-Z0-9])/;
    if(!regex.test(password)){
      throw new CommonErrorHandler("Password must contain a combination of lowercase,uppercase and at least one special character",400);
    }
    
    await sendPassworResetMail(email, password, userOtp);

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const cookie = serialize(email, JSON.stringify({ userOtp, hashedPassword }), {
      maxAge: 300 // 5 minutes
    });

    const response = NextResponse.json(
      { message: `OTP sent successfully to mail: ${email}`},
      { status: 200 }
    );

    response.headers.set("Set-Cookie", cookie);
    console.log("Password reset OTP sent to mail:", userOtp);

    return response;
  } catch (error) {
    if (error instanceof CommonErrorHandler) {
      return sendError(error.message, error.statusCode);
    }

    return sendError("Some error occurred while updating password", 500);
  }
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
