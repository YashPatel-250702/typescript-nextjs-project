import { Player } from "@/models/playerModels/PlayerModel";
import {
    checkExistingPlayerId,
    deletePlayerById,
    findPlayerById,
} from "./PlayerService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const deletePlayer = async (id: number): Promise<number> => {
    const player: number = await checkExistingPlayerId(id);
    if (player == 0) {
        throw new CommonErrorHandler("Player not found with id: " + id, 404);
    }
    const deletedPlayerId: number = await deletePlayerById(id);

    if (!deletedPlayerId) {
        throw new Error("Player not deleted with id: " + id);
    }
    return deletedPlayerId;
};
