import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async uploadFile(file: Express.Multer.File): Promise<{ public_id: string; source_url: string }> {
        return new Promise<{ public_id: string; source_url: string }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((error: any, result: UploadApiResponse) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        public_id: result.public_id,
                        source_url: result.url
                    });
                }
            });

            const streamifier = require('streamifier');
            const readableStream = streamifier.createReadStream(file.buffer);
            readableStream.pipe(uploadStream);
        });
    }

    async deleteFile(public_id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            cloudinary.uploader.destroy(public_id, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
