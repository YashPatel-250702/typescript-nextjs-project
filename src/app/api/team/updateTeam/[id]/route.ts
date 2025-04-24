import { CommonErrorHandler } from "@/customErrors/CommonError";
import { sendError } from "@/customErrors/error";
import { Team } from "@/models/teamModels/TeamsModel";
import { sendValidationResponse } from "@/response/ValidationResponse";
import { updateTeamByid } from "@/service/teamService/UpdateTeam";
import { teamDataValidation } from "@/validations/TeamDataValidation";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:{id:string}}) {
    try {
        const id=params.id;
        const team:Team=await req.json();

        const validatedData = teamDataValidation.safeParse(team);
        if(!validatedData.success){
            return sendValidationResponse(validatedData);
        }

        const teamId=await updateTeamByid(parseInt(id),team);
        return NextResponse.json({message:"Team updated successfully",teamId},{status:200});
        
    } catch (error) {
        if(error instanceof CommonErrorHandler){
            return sendError(error.message,error.statusCode);
        }
        return sendError("Some error occured while updating team",500);
        
    }
}