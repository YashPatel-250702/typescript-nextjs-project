import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { Team } from "@/models/teamModels/TeamsModel";

import { sendValidationResponse } from "@/response/ValidationResponse";
import { createTeam } from "@/service/teamService/CreateTeam";
import { teamDataValidation } from "@/validations/TeamDataValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const team: Team = await req.json();

        const validatedData = teamDataValidation.safeParse(team);

        if (!validatedData.success) {
            return sendValidationResponse(validatedData);
        }

        const teamid = await createTeam(team);
        return NextResponse.json(
            { message: "Team created successfully", teamid },
            { status: 200 },
        );
    } catch (error) {
        console.error("Some error occured while creating team", error);

        if (error instanceof CommonErrorHandler) {
            return sendError(error.message, error.statusCode);
        }

        return sendError(
            "Some error occured while creating team",
            500,
        );
    }
}
