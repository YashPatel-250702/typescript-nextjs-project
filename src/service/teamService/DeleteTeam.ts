import { Teams } from "@prisma/client";
import {
    checkExistingTeamById,
    deleteTeamById,
    findTeamById,
} from "./TeamService";
import { Team } from "@/models/teamModels/TeamsModel";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const deleteTeam = async (id: number): Promise<number> => {
    const teamCount: number = await checkExistingTeamById(id);
    if (teamCount == 0) {
        throw new CommonErrorHandler("Team not found with id: " + id, 404);
    }
    const playedId: number = await deleteTeamById(id);
    if (!playedId) {
        throw new Error("Team not deleted with id: " + id);
    }

    return playedId;
};
