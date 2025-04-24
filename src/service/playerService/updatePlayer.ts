import { Player } from "@prisma/client";
import { checkExistingPlayerId, checkExistingPlayerWithJersyNo, findPlayerById, updatePlayerId } from "./PlayerService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const updatePlayer=async(playerId:number,player:Player)=>{
    const existingPlayer=await findPlayerById(playerId);
    if(existingPlayer==null){
        throw new CommonErrorHandler("Player not found with id: "+playerId,404);
    }
    if(existingPlayer.jersyNo!=player.jersyNo){
        throw new CommonErrorHandler(`CanNot Change player id ${playerId} jersyno: ${existingPlayer.jersyNo} To ${player.jersyNo}`,400);
    }
    const updatedPlayer=await updatePlayerId(playerId,player);
    if(!updatedPlayer){
        throw new CommonErrorHandler("Player not updated with id: "+playerId,500);
    }
    return updatedPlayer;
}