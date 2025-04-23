import { Team } from "@/models/teamModels/TeamsModel";
import { addNewTeam, checkExistingTeamByName } from "./TeamService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const createTeam = async (team: Team): Promise<number> => {
  const teamCount: number = await checkExistingTeamByName(team.name);

  if (teamCount > 0) {
    throw new CommonErrorHandler(
      `Team with name '${team.name}' already exists`,
      400,
    );
  }

  const teamId: number = await addNewTeam(team);
  if (!teamId) {
    throw new Error("Team Not Added With name: " + team.name);
  }
  return teamId;
};
