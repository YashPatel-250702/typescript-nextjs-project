import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { Player } from "@/models/playerModels/PlayerModel";
import { getAllPlayerByTeamId } from "@/service/teamService/GetAllPlayerByTeamId";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}}) {
    try {
        const id=params.id;
        const player:Player[]=await getAllPlayerByTeamId(parseInt(id));
        return NextResponse.json({data:player},{status:200});
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message,error.statusCode);
        }
        return sendError(
            "Some error occured while fetching player",500)
        
    }
    
}