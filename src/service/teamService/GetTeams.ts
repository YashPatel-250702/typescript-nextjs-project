import { findAll, findTeamById } from "./TeamService";

export const getTeamById= async (id: number) => {
    const team = await findTeamById(id);
    if(team==null) {
        throw new Error("Team not found With id: "+id);
    }
    return team;
};

export const getAllTeams=async()=> {
    const allTeams=await findAll();
    if(!allTeams||allTeams.length==0) {
        throw new Error("No teams found");
    }
    return allTeams;
}   