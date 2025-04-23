import prisma from "@/lib/prism-client";
import { Team } from "@/models/teamModels/TeamsModel";
import { addNewTeam, checkExistingTeam } from "./TeamService";

export const createTeam = async (team: Team): Promise<number> => {

  const existingTeam :Team|null= await checkExistingTeam(team.name);

  if (existingTeam) {
    throw new Error(`Team with name '${team.name}' already exists`);
  }

  const teamId:number=await addNewTeam(team);
  if(!teamId) {
    throw new Error("Team Not Added With name: "+team.name);
  }
  return teamId;
};
