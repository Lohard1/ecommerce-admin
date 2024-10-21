// ruta app/api/upload/route.ts

import { Storage } from "@google-cloud/storage"
import { NextRequest, NextResponse } from "next/server";

const GCS_KEYFILE_PATH = process.env.GOOGLE_CLOUD_KEYFILE;
const GCS_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const GCS_BUCKET_NAME = process.env.GCS_BUCKET_NAME

const storage = new Storage({
    projectId: GCS_PROJECT_ID,
    keyFilename: GCS_KEYFILE_PATH,
});
const bucket = storage.bucket(GCS_BUCKET_NAME!);

export async function POST(req: NextRequest) {
    
    try {
        const formData = await req.formData();
        const allowedTypes = ['image/png', 'image/jpeg'];
        const files = formData.getAll('files');
        const fileUrls: string[] = [];

        console.log(formData)
        
        //const fileEntry = formData.get('file');

        if (!files || files.length === 0 ) {
            return NextResponse.json({ message: 'No files provided or invalid files' }, { status: 400 });
        }

        
        // if (!allowedTypes.includes(fileEntry.type)) {
        //     return NextResponse.json({ message: 'Invalid file type. Only PNG and JPEG are allowed.' }, { status: 400 });
        // }

        //const fileName = `upload_${Date.now()}.png`;
        //const buffer = Buffer.from(await fileEntry.arrayBuffer());

        //const blob = bucket.file(fileName);
        //const blobStream = blob.createWriteStream({
        //    resumable: false,
        //});


        const uploadPromises = files.map(async (fileEntry, index) => {
            if (!(fileEntry instanceof File)) {
                throw new Error('Invalid file format');
            }

            if (!allowedTypes.includes(fileEntry.type)) {
                throw new Error('Invalid file type');
            }

            const fileName = `upload_${Date.now()}_${index}.${fileEntry.type.split('/')[1]}`;
            const buffer = Buffer.from(await fileEntry.arrayBuffer());

            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });

        return new Promise<string>((resolve, reject) => {
            blobStream.on('finish', () => {
                const fileUrl = `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${fileName}`;
                fileUrls.push(fileUrl);
                resolve(fileUrl);
            });

            blobStream.on('error', (err) => {
                reject(`Failed to upload file ${fileEntry.name}: ${err.message}`);
            });

            blobStream.end(buffer);
        });
    });

    await Promise.all(uploadPromises);
    return NextResponse.json({ message: 'Files uploaded successfully', urls: fileUrls });
    } catch (err) {
        return NextResponse.json({ message: 'Server error', error: err }, { status: 500 });
    }
}
