import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { getPlayerImage } from "@/service/playerService/playerimage";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { message: "Missing required parameter: id" },
        { status: 400 },
      );
    }

    const url = await getPlayerImage(parseInt(id));
    return NextResponse.json(
      { data: url },
      { status: 200 },
    );
  } catch (error) {
    console.error("Some error occured while creating player", error);

    if (error instanceof CommonErrorHandler) {
      return sendError(error.message, error.statusCode);
    }

    return sendError(
      "Some error occured while creating player",
      500,
    );
  }
}
