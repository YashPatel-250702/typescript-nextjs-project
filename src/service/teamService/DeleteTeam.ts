import { Teams } from "@prisma/client";
import { deleteTeamById, findTeamById } from "./TeamService";
import { Team } from "@/models/teamModels/TeamsModel";

export const deleteTeam=async(id:number):Promise<number>=> {
   try {
    const team:Team|null=await findTeamById(id);
    if(!team){
        throw new Error("Team not found with id: "+id);
    }
    const playedId:number= await deleteTeamById(id);
    if(!playedId){
        throw new Error("Team not deleted with id: "+id);
    }

    return playedId;
   } catch (error) {
    console.error(error);
    throw new Error("Error while deleting player")
   }
    
}   