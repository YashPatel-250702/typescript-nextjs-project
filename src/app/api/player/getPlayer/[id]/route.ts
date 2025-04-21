import { sendError } from "@/response/error";
import { getPlayerById } from "@/services/playerService/GetPlayer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { id: string }}) {
   
    try {
        const id=params.id;
        if (!id) {
          return sendError("Missing required parameter: id", 400);
        }

        const player=await getPlayerById(parseInt(id));
        return NextResponse.json({message:"Player fetched successfully",data:player},{status:200});

    } catch (error) {
        console.error("Some error occured while getting player",error);
        return sendError(error instanceof Error ? error.message : "Some error occured while getting player", 500);
        
    }
}