import { findAll, findPlayerById } from "./PlayerService";

export const getPlayerById = async (id: number) => {
    const player = await findPlayerById(id);
    if(player==null) {
        throw new Error("Player not found");
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