import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { sendValidationResponse } from "@/response/ValidationResponse";
import { updatePlayer } from "@/service/playerService/updatePlayer";
import { playerDataValidation } from "@/validations/PlayerValidation";
import { Player } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:{id:string}}) {
    try {
        const id=params.id;
        const player: Player = await req.json();
        const validatedData = playerDataValidation.safeParse(player);
       
        if (!validatedData.success) { 
          return sendValidationResponse(validatedData);
        }
        const updatedPlayer=await updatePlayer(parseInt(id),player);
        return NextResponse.json({message:"Player updated successfully",updatedPlayer},{status:200});
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
           return sendError(error.message,error.statusCode);
        }
        return sendError(
            "Some error occured while updating player",
            500,)
        
    }
    
}