import prisma from "@/lib/prism-client";
import { Player } from "@/models/playerModels/PlayerModel";
import { addNewPlayer, checkExistingPlayer } from "./PlayerService";
import { findTeamById } from "../teamService/TeamService";
import { Team } from "@/models/teamModels/TeamsModel";


export const addPlayer = async (player: Player): Promise<number> => {


    const existingPlayer:Player|null = await checkExistingPlayer(player.jersyNo)
    if (existingPlayer) {
        throw new Error(`Player with jersyNo '${player.jersyNo}' already exists`);
    }

    const checkTeam:Team|null=await findTeamById(player.teamId);

    if(!checkTeam){
        throw new Error(`Team with id '${player.teamId}' does not exist`);
    }
    
    const playerId:number=await addNewPlayer(player);
    if(!playerId){
        throw new Error("Player Not Added With jersyNo: "+player.jersyNo);
    }
    return playerId;
}