import { config } from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";

export function getS3Client() {
    config();

    const accessKey = process.env.AWS_ACCESS_KEY;
    const secretKey = process.env.AWS_SECRET_KEY;
    const region = process.env.AWS_REGION;

    if (!accessKey || !secretKey || !region) {
        throw new Error(
            "Missing required AWS credentials in environment variables",
        );
    }

    const s3 = new S3Client({
        region: region,
        credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
    });

    return s3;
}
