import { Team } from "@/models/teamModels/TeamsModel";
import { checkExistingTeamById, updateTeamById } from "./TeamService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const updateTeamByid=async (teamId:number,team:Team):Promise<Team>=> {
    const teamCount=await checkExistingTeamById(teamId);
    if(teamCount==0){
        throw new CommonErrorHandler("Team not found with id: "+teamId,404);
    }
    const result=await updateTeamById(teamId,team);
    if(!result){
        throw new CommonErrorHandler("Team not updated with id: "+teamId,500);
    }
    return team;
}