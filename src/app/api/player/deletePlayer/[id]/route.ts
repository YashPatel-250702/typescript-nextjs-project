import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";

import { deletePlayer } from "@/service/playerService/DeletePlayerById";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } },
): Promise<NextResponse> {
    try {
        const id = params.id;
        if (!id) {
            return sendError("Missing required parameter: id", 400);
        }
        const playerId = await deletePlayer(parseInt(id));

        return NextResponse.json(
            { message: "Player deleted successfully", data: playerId },
            { status: 200 },
        );
    } catch (error) {
        console.error("Some error occured while deleting player", error);

        if (error instanceof CommonErrorHandler) {
            return sendError(error.message, error.statusCode);
        }

        return sendError(
            "Some error occured while deleting player",
            500,
        );
    }
}
