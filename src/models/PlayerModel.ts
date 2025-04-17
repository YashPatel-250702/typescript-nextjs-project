import { Team } from "./TeamsModel";

export interface Player {
    id?: number;
    name: string;
    age: number;
    jersyNo: number;
    role: "Batsman" | "Bowler" | "All-Rounder" | "WicketKeeper";
    totalRuns: number;
    noOfMatchPlayed: number;
    teamId: number;
    createdAt: Date;
    updatedAt: Date;
    team: Team;
}
