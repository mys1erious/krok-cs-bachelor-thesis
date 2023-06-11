import S3 from "aws-sdk/clients/s3";
import axios from "axios";
import {Exceptions, Success} from "@/app/constants/constants";


const s3 = new S3({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET,
    signatureVersion: process.env.NEXT_PUBLIC_AWS_S3_SIGNATURE_VERSION
});


export default async function aws(file: File | undefined) {
    if (!file) return Exceptions.NO_IMAGE_PROVIDED_ERROR;

    try {
        const fileParams = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Key: file.name,
            Expires: 600,
            ContentType: file.type
        }

        const url = await s3.getSignedUrlPromise('putObject', fileParams);

        await axios.put(url, file, {
            headers: {'Content-type': String(file.type)}
        });

        return Success.IMAGE_UPLOADED;
    } catch (e) {
        return Exceptions.IMAGE_UPLOADED_ERROR;
    }
};
