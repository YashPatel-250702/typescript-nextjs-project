import { Player } from "@/models/playerModels/PlayerModel";
import { getPlayerImage } from "./playerimage";
import { findAll, findPlayerById } from "./PlayerService";

export const getPlayerById = async (id: number) => {
    const player:Player|null = await findPlayerById(id);
    if(player==null) {
        throw new Error("Player not found");
    }
    try {
        const imageUrl=await getPlayerImage(id);
        player.imageUrl=imageUrl
    } catch (error) {
        player.imageUrl=null
    }
    return player;
};  

export const getAllPlayers=async()=> {
   
    const allPlayers= await findAll();
    if(allPlayers.length==0) {
        throw new Error("No players found");
    }
    return allPlayers;
}