import prisma from "@/lib/prism-client";
import { Team } from "@/models/teamModels/TeamsModel";

export const checkExistingTeam = async (name: string)=> {
  const existingTeam = await prisma.teams.findUnique({
    where: { name: name },
  });

  return existingTeam;

}

export const addNewTeam=async(team:Team):Promise<number>=> {
   
  const newTeam = await prisma.teams.create({
    data: {
      name: team.name,
      country: team.country,
      coach: team.coach,
      captain: team.captain,
      isActive: true,
    },
  });

  return newTeam.id;
}


export const findTeamById = async (id: number)=> {
  const existingTeam = await prisma.teams.findUnique({
    where: { id: id },
  });

  return existingTeam;

}

export const findAll=async()=>{
  const allTeams=await prisma.teams.findMany();
  return allTeams;
}

export const deleteTeamById=async(id:number)=>{
  const result= await prisma.teams.delete({where:{id:id}}); 
  return result.id;
}