import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";

import { deleteTeam } from "@/service/teamService/DeleteTeam";
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
        const teamId = await deleteTeam(parseInt(id));

        return NextResponse.json(
            { message: "Team deleted successfully", teamId },
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
