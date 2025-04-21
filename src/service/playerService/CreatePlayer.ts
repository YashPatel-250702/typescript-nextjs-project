import prisma from "@/lib/prism-client";
import { Player } from "@/models/playerModels/PlayerModel";
import { addNewPlayer, checkExistingPlayer } from "./PlayerService";
import { findTeamById } from "../teamService/TeamService";


export const addPlayer = async (player: Player): Promise<number> => {


    const existingPlayer = await checkExistingPlayer(player.jersyNo)
    if (existingPlayer) {
        throw new Error(`Player with jersyNo '${player.jersyNo}' already exists`);
    }

    const checkTeam=await findTeamById(player.teamId);

    if(!checkTeam){
        throw new Error(`Team with id '${player.teamId}' does not exist`);
    }
    
    const playerId=await addNewPlayer(player);
    if(!playerId){
        throw new Error("Player Not Added With jersyNo: "+player.jersyNo);
    }
    return playerId;
}