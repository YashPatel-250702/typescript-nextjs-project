import { NextResponse } from "next/server";

export function sendValidationResponse(validatedData: any): NextResponse {
  const error: Record<string, string> = {};

  validatedData.error.issues.map((issue: any) => {
    error[issue.path[0]] = issue.message;
  });

  return NextResponse.json(error, { status: 400 });
}
