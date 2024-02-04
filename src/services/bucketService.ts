import BucketRepository from '@repositories/bucketRepository';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils/enum';
import { S3Client } from '@aws-sdk/client-s3';
import { PutObjectCommand, GetObjectCommand, HeadObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class BucketService {
  private repository: BucketRepository;
  private r2: S3Client;

  private static readonly R2_BUCKET_ACCESS_KEY_ID = String(process.env.R2_BUCKET_ACCESS_KEY_ID);
  private static readonly R2_BUCKET_SECRET_ACCESS_KEY = String(process.env.R2_BUCKET_SECRET_ACCESS_KEY);
  private static readonly R2_BUCKET_ACCOUNT_ID = String(process.env.R2_BUCKET_ACCOUNT_ID);
  private static readonly R2_BUCKET_NAME = String(process.env.R2_BUCKET_NAME);

  constructor() {
    this.repository = new BucketRepository();
    this.r2 = new S3Client({
      endpoint: `https://${BucketService.R2_BUCKET_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: BucketService.R2_BUCKET_ACCESS_KEY_ID,
        secretAccessKey: BucketService.R2_BUCKET_SECRET_ACCESS_KEY,
      },
      region: 'auto',
    });
  }

  async getPresignedUrl(body: any) {
    try {
      const ownerID = body.ownerID;
      const filename = body.filename;
      const contentType = body.contentType;
      const permission = body.permission;
      const url: string[] = [];
      const ids: number[] = [];

      if (!ownerID || !filename || !contentType || filename.length === 0 || contentType.length === 0 || permission === null)
        throw new Error('Invalid request');

      for (let i = 0; i < filename.length; i++) {
        const data = await this.repository.add({
          ownerID,
          filename: filename[i],
          permission,
        });

        if (!data) throw new Error('Failed to add data to database');

        const presignedUrl = await getSignedUrl(
          this.r2,
          new PutObjectCommand({
            Bucket: BucketService.R2_BUCKET_NAME,
            Key: data.id.toString(),
            ContentType: contentType[i],
          }),
          {
            expiresIn: 60 * 15, // 15 minutes
          }
        );

        url.push(presignedUrl);
        ids.push(data.id);
      }

      return new BaseResponse(STATUS_CODE.OK, true, 'Get presigned url successfully', { url, ids });
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async confirmUpload(body: any) {
    try {
      const ids = body.ids;

      if (!ids || ids.length === 0) throw new Error('Invalid request');

      for (let i = 0; i < ids.length; i++) {
        // Check file is exist or not
        await this.r2.send(
          new HeadObjectCommand({
            Bucket: BucketService.R2_BUCKET_NAME,
            Key: ids[i].toString(),
          })
        );

        await this.repository.patchEntity({
          id: ids[i],
          uploadStatus: true,
        });
      }

      return new BaseResponse(STATUS_CODE.OK, true, 'Upload confirmation successfully');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getFile(id: number) {
    try {
      const data = await this.repository.getByEntity({ id });
      if (!data || !data.uploadStatus) 
        throw new Error('File does not exist');

      const url = await getSignedUrl(
        this.r2,
        new GetObjectCommand({
          Bucket: BucketService.R2_BUCKET_NAME,
          Key: id.toString(),
        }),
        {
          expiresIn: 60 * 15, // 15 minutes
        }
      );
      
      return new BaseResponse(STATUS_CODE.OK, true, 'Get file successfully', url);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async deleteFile(id: number) {
    try {
      await this.r2.send(
        new DeleteObjectCommand({
          Bucket: BucketService.R2_BUCKET_NAME,
          Key: id.toString(),
        })
      );
      
      const data = await this.repository.getByEntity({ id });
      if (!data) 
        throw new Error('File does not exist');
      
      await this.repository.delete({ id });

      return new BaseResponse(STATUS_CODE.OK, true, 'Delete file successfully');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const bucketService = new BucketService();
export default bucketService;
