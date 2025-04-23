
import { Player } from "@/models/playerModels/PlayerModel";
import { deletePlayerById, findPlayerById } from "./PlayerService"

export const deletePlayer=async(id:number):Promise<number>=>{
   try {
    const player:Player|null=await findPlayerById(id);
    if(!player) {
        throw new Error("Player not found with id: "+id);
    }
    const deletedPlayerId:number=await deletePlayerById(id);

    if(!deletedPlayerId) {
        throw new Error("Player not deleted with id: "+id);
    }
    return deletedPlayerId;
   } catch (error) {

    console.error(error);
    throw new Error("Error while deleting player");
    
   }
}