import { Player } from "./PlayerModel";

export interface Team {
    id?: number;
    name: string;
    country: string;
    coach: string;
    captain: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    players: Player[];
}
