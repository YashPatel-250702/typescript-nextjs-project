import { sendError } from "@/response/error";
import { getAllTeams, getTeamById } from "@/service/teamService/GetTeams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest):Promise<NextResponse>  {
    try {
      
        const team=await getAllTeams();
        return NextResponse.json(
            {messge:"Teams Fetched Successfully",data:team}, 
            {status:200})
    } catch (error) {
        console.error("Some error while fetching teams"+error)
        return sendError(error instanceof Error?error.message:"Some error occured while fetching team",500);
    }
}