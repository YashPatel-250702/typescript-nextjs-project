import { CommonErrorHandler } from "@/customErrors/CommonError";
import { Player } from "@/models/playerModels/PlayerModel";
import { sendError } from "@/response/error";
import { sendValidationResponse } from "@/response/ValidationResponse";
import { addPlayer } from "@/service/playerService/CreatePlayer";
import { playerDataValidation } from "@/validations/PlayerValidation";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const player: Player = await req.json();
        const validatedData = playerDataValidation.safeParse(player);

        if (!validatedData.success) {
            return sendValidationResponse(validatedData);
        }
        const playerId = await addPlayer(player);

        return NextResponse.json(
            { "Player Saved successfully": playerId },
            { status: 200 },
        );
    } catch (error) {
        console.error("Some error occured while creating player", error);

        if (error instanceof CommonErrorHandler) {
            return sendError(error.message, 400);
        }

        return sendError(
            "Some error occured while creating player",
            500,
        );
    }
}
