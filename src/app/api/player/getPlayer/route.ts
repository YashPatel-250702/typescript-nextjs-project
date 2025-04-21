import { sendError } from "@/response/error";
import { getAllPlayers } from "@/service/playerService/GetPlayer";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const allPlayers=await getAllPlayers()
        return NextResponse.json({message:"Players fetched successfully",data:allPlayers},{status:200});
    } catch (error) {

        console.error("Some error occured while getting players",error);
        return sendError(error instanceof Error?error.message:"Some error occured while getting players",500);
    }
}