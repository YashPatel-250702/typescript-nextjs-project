import { Player } from "@/models/playerModels/PlayerModel";
import { getPlayerByTeamId } from "../playerService/PlayerService"
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const getAllPlayerByTeamId=async(teamId:number):Promise<Player[]>=>{
    const players:Player[]=await getPlayerByTeamId(teamId);
    if(!players||players.length==0){
        throw new CommonErrorHandler("No players found with teamId: "+teamId,404);
    }
    return players;
}   