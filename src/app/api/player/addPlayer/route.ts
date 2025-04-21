
import { Player } from "@/models/playerModels/PlayerModel";
import { sendError } from "@/response/error";
import { addPlayer } from "@/services/playerService/CreatePlayer";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
       try {
          const player:Player  = await req.json();
          const playerId=await addPlayer(player);   

          return NextResponse.json(
              {"Player Saved successfully":playerId},
              {status:200});

       } catch (error) {
          console.error("Some error occured while creating player",error);
          return sendError(
              error instanceof Error?error.message:"Some error occured while creating player",
               500);
              
       }
      
}