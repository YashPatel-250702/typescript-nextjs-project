import { Player } from "@/models/playerModels/PlayerModel";
import { getPlayerImage } from "./playerimage";
import { findAll, findPlayerById } from "./PlayerService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

export const getPlayerById = async (id: number): Promise<Player | null> => {
    const player: Player | null = await findPlayerById(id);
    if (player == null) {
        throw new CommonErrorHandler("Player not found with id: " + id, 404);
    }
    try {
        const imageUrl: string = await getPlayerImage(id);
        player.imageUrl = imageUrl;
    } catch (error) {
        player.imageUrl = null;
    }
    return player;
};

export const getAllPlayers = async (): Promise<Player[]> => {
    const allPlayers: Player[] = await findAll();
    if (allPlayers.length == 0) {
        throw new CommonErrorHandler("No players found", 404);
    }
    await Promise.all(
        allPlayers.map(async (player: Player) => {
            if (player.id) {
                try {
                    const imageUrl: string = await getPlayerImage(player.id);
                    player.imageUrl = imageUrl;
                } catch (error) {
                    player.imageUrl = null;
                }
            }
        }),
    );
    return allPlayers;
};
