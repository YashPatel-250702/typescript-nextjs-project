import { Team } from "@/models/teamModels/TeamsModel";
import { findAll, findTeamById } from "./TeamService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const getTeamById = async (id: number): Promise<Team> => {
    const team: Team | null = await findTeamById(id);
    if (team == null) {
        throw new CommonErrorHandler("Team not found With id: " + id, 404);
    }
    return team;
};

export const getAllTeams = async (): Promise<Team[]> => {
    const allTeams: Team[] = await findAll();
    if (!allTeams || allTeams.length == 0) {
        throw new CommonErrorHandler("No teams found", 404);
    }
    return allTeams;
};
