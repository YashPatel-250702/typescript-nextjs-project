import { getS3Client } from "@/lib/s3client";
import {
  GetObjectCommand,
  HeadObjectCommand,
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { config } from "dotenv";
import { url } from "inspector";
import { buffer } from "stream/consumers";
import { checkExistingPlayerId } from "./PlayerService";
import { CommonErrorHandler } from "@/customErrors/CommonError";

const folderName = "images/";
export const addPlayerImage = async (playerId: number, image: File) => {
  config();

  try {
    const count = await checkExistingPlayerId(playerId);
    if (count == 0) {
      throw new CommonErrorHandler(
        "Player not found with id: " + playerId,
        404,
      );
    }
    const s3: S3Client = getS3Client();
    const s3Bucketname: string = process.env.AWS_S3_BUCKET_NAME || "";

    if (!s3Bucketname) {
      throw new Error("S3 bucket name is not defined in environment variables");
    }

    const objectId: string = `${folderName}${playerId}.jpg`;

    const buffer = await image.arrayBuffer();

    const params = {
      Bucket: s3Bucketname,
      Key: objectId,
      Body: Buffer.from(buffer),
      ContentType: image.type,
    };

    const result: any = await s3.send(new PutObjectCommand(params));

    console.log("Image uploaded successfully:", result);
    return result;
  } catch (error) {
    console.error("Error while uploading image:", error);
    throw error;
  }
};

export const getPlayerImage = async (playerId: number): Promise<string> => {
  try {
    const count = await checkExistingPlayerId(playerId);
    if (count == 0) {
      throw new CommonErrorHandler(
        "Player not found with id: " + playerId,
        404,
      );
    }
    const s3: S3Client = getS3Client();
    const s3Bucketname = process.env.AWS_S3_BUCKET_NAME;

    if (!s3Bucketname) {
      throw new Error("S3 bucket name is not defined in environment variables");
    }
    const objectId: string = `${folderName}${playerId}.jpg`;
    try {
      await s3.send(
        new HeadObjectCommand({ Bucket: s3Bucketname, Key: objectId }),
      );
    } catch (headError) {
      throw new Error("Object does not exist in S3 bucket");
    }

    const url: string = `https://${s3Bucketname}.s3.amazonaws.com/${objectId}`;
    return url;
  } catch (error) {
    console.error("Error while uploading image:", error);
    throw error;
  }
};
