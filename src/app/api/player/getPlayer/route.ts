import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { getAllPlayers } from "@/service/playerService/GetPlayer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const allPlayers = await getAllPlayers();
        return NextResponse.json({
            message: "Players fetched successfully",
            data: allPlayers,
        }, { status: 200 });
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
