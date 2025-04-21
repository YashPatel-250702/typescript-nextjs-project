import { NextResponse } from "next/server";

export const sendError = (message: string, status: number) => NextResponse.json({ error: message }, { status });
