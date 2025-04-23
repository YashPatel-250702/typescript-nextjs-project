import prisma from "@/lib/prism-client";
import { Team } from "@/models/teamModels/TeamsModel";

export const checkExistingTeamByName = async (
  name: string,
): Promise<number> => {
  const count = await prisma.teams.count({
    where: { name: name },
  });

  return count;
};

export const checkExistingTeamById = async (id: number): Promise<number> => {
  const count = await prisma.teams.count({
    where: { id: id },
  });

  return count;
};

export const addNewTeam = async (team: Team): Promise<number> => {
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
};

export const findTeamById = async (id: number) => {
  const existingTeam = await prisma.teams.findUnique({
    where: { id: id },
  });

  return existingTeam;
};

export const findAll = async () => {
  const allTeams = await prisma.teams.findMany();
  return allTeams;
};

export const deleteTeamById = async (id: number) => {
  const result = await prisma.teams.delete({ where: { id: id } });
  return result.id;
};
