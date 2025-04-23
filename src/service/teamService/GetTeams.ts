import { Team } from "@/models/teamModels/TeamsModel";
import { findAll, findTeamById } from "./TeamService";

export const getTeamById= async (id: number):Promise<Team> => {
    const team:Team|null = await findTeamById(id);
    if(team==null) {
        throw new Error("Team not found With id: "+id);
    }
    return team;
};

export const getAllTeams=async():Promise<Team[]>=> {
    const allTeams:Team[]=await findAll();
    if(!allTeams||allTeams.length==0) {
        throw new Error("No teams found");
    }
    return allTeams;
}   