import { Team } from "../teamModels/TeamsModel";
type Role= "Batsman" | "Bowler" | "AllRounder" | "WicketKeeper"
export interface Player {
    id?: number;
    name: string;
    age: number;
    jersyNo: number;
    role:Role;
    totalRuns: number;
    totalWickets: number;
    noOfMatchPlayed: number;
    teamId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
