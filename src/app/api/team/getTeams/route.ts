import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { getAllTeams, getTeamById } from "@/service/teamService/GetTeams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const team = await getAllTeams();
        return NextResponse.json(
            { messge: "Teams Fetched Successfully", data: team },
            { status: 200 },
        );
    } catch (error) {
        console.error("Some error occured while fetching player", error);

        if (error instanceof CommonErrorHandler) {
            return sendError(error.message, error.statusCode);
        }

        return sendError(
            "Some error occured while fetching player",
            500,
        );
    }
}
