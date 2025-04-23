import { Player } from "@/models/playerModels/PlayerModel";
import { addNewPlayer, checkExistingPlayerWithJersyNo } from "./PlayerService";
import {
    checkExistingTeamById,
    findTeamById,
} from "../teamService/TeamService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const addPlayer = async (player: Player): Promise<number> => {
    const existingPlayer: number = await checkExistingPlayerWithJersyNo(
        player.jersyNo,
    );
    console.log("Player count is: " + existingPlayer);
    if (existingPlayer > 0) {
        throw new CommonErrorHandler(
            `Player with jersyNo '${player.jersyNo}' already exists`,
            400,
        );
    }

    const checkTeamCount: number = await checkExistingTeamById(player.teamId);

    if (checkTeamCount == 0) {
        throw new CommonErrorHandler(
            `Team with id '${player.teamId}' does not exist`,
            404,
        );
    }

    const playerId: number = await addNewPlayer(player);
    if (!playerId) {
        throw new Error("Player Not Added With jersyNo: " + player.jersyNo);
    }
    return playerId;
};
