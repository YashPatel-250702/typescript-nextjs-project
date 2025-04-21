import { NextResponse } from "next/server";

export function sendValidationResponse(validatedData:any) {
    if (!validatedData.success) {
        const error: Record<string, string> = {};
      
        for (const issue of validatedData.error.issues) {
          const field = issue.path[0] as string;
          const errorMessage = issue.message;
          error[field] = errorMessage;
        }
      
        return NextResponse.json(error, { status: 400 });
      }
}