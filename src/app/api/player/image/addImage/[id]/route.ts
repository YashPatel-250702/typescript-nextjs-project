import { sendError } from "@/response/error";
import { addPlayerImage } from "@/service/playerService/playerimage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,{ params }: { params: { id: string }})
 :Promise<NextResponse> {
  
    try {
        const id=params.id;
        if(!id){
            return sendError("Missing required parameter: id", 400);
        }
        const formData = await req.formData();
        const file = formData.get("image") as File;
         if (!file) {
            return sendError("Image file is required", 400);
          }
    
          if (file.type !== "image/jpeg") {
            return sendError("File type should be jpg", 400);
          }

          if (file.size > 2 * 1024 * 1024) {
            return sendError("File size should be less than 2MB", 400);
          }
      
    
       const uploadedFile=  await addPlayerImage(parseInt(id),file);

       return NextResponse.json(
        { message: "Image uploaded successfully" }, 
        { status: 200 });
    } catch (error) {
        return sendError(error instanceof  Error?error.message:"Missing required parameter: id", 400);
    }
}