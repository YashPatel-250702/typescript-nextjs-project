import prisma from "@/lib/prism-client";
import { Player } from "@/models/playerModels/PlayerModel";

export const checkExistingPlayerWithJersyNo = async (jersyNo: number,): Promise<number> => {
  const count = await prisma.player.count({
    where: { jersyNo: jersyNo },
  });

  return count;
};

export const checkExistingPlayerId = async (playerId: number): Promise<number> => {
  const count = await prisma.player.count({ where: { id: playerId } });
  return count;
};

export const addNewPlayer = async (player: Player) => {
  const newPlayer = await prisma.player.create({
    data: {
      name: player.name,
      jersyNo: player.jersyNo,
      teamId: player.teamId,
      role: player.role,
      age: player.age,
      totalRuns: player.totalRuns,
      totalWickets: player.totalWickets,
      noOfMatchPlayed: player.noOfMatchPlayed,
    },
  });

  return newPlayer.id;
};

export const findPlayerById = async (id: number) => {
  const existingPlayer = await prisma.player.findUnique({
    where: { id: id },
  });
  return existingPlayer;
};

export const findAll = async () => {
  const allPlayers = await prisma.player.findMany(
    // {include:{team:true}}
  );
  return allPlayers;
};

export const deletePlayerById = async (id: number) => {
  const result = await prisma.player.delete({ where: { id: id } });
  return result.id;
};

export const updatePlayerId=async(playerId:number,player:Player):Promise<Player>=>{
    const updatedPlayer=await prisma.player.update({
        where:{id:playerId},
        data:player
    });
    return updatedPlayer;
}

export const getPlayerByTeamId=async(teamId:number):Promise<Player[]>=>{
    const players=await prisma.player.findMany({
        where:{teamId:teamId}
    });
    return players;
}