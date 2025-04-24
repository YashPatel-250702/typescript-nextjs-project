import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { LoginResponse } from "@/response/LoginResponse";
import { loginAndGenerateToken } from "@/service/userService/login";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password }: { email: string; password: string } = await req
      .json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const token: LoginResponse = await loginAndGenerateToken(email, password);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Some error occured while login", error);

    if (error instanceof CommonErrorHandler) {
      return sendError(error.message, error.statusCode);
    }

    return sendError(
      "Some error occured while login",
      500,
    );
  }
}
