import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { getPlayerById } from "@/service/playerService/GetPlayer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  try {
    const id = params.id;
    if (!id) {
      return sendError("Missing required parameter: id", 400);
    }

    const player = await getPlayerById(parseInt(id));
    return NextResponse.json({
      message: "Player fetched successfully",
      data: player,
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
