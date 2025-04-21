import prisma from "@/lib/prism-client";
import { Player } from "@/models/playerModels/PlayerModel";


export const checkExistingPlayer = async (jersyNo: number) => {

    const existingPlayer = await prisma.player.findUnique({
        where: { jersyNo: jersyNo },
    });
    
    return existingPlayer;
}

export const addNewPlayer=async(player:Player)=>{
    
    const newPlayer = await prisma.player.create({
        data: {
          name: player.name,
          jersyNo: player.jersyNo,
          teamId: player.teamId,
          role: player.role,
          age: player.age,
          totalRuns: player.totalRuns,
          totalWickets: player.totalWickets,
          noOfMatchPlayed: player.noOfMatchPlayed
        }
      });

    return newPlayer.id;   
}

export const findPlayerById = async (id: number)=> {
    const existingPlayer = await prisma.player.findUnique({
      where: { id: id },
    }); 
   return existingPlayer;
}

export const findAll=async()=> {
    const allPlayers=await prisma.player.findMany();
    return allPlayers;
}

