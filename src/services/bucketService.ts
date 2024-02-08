import BucketRepository from '@repositories/bucketRepository';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils/enum';
import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from '@aws-sdk/client-s3';
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

  async startMultipartUpload(body: any) {
    try {
      const ownerID: number = body.ownerID;
      const filename: string = body.filename;
      const contentType: string = body.contentType;
      const permission: number = body.permission;

      if (
        !ownerID ||
        !filename ||
        !contentType ||
        permission === null // permission can be 0
      )
        throw new Error('Invalid request');

      // Save to database to get Key (id)
      const dbData = await this.repository.add({
        ownerID,
        filename,
        permission,
      });

      // Get upload ID
      const r2Data = await this.r2.send(
        new CreateMultipartUploadCommand({
          Bucket: BucketService.R2_BUCKET_NAME,
          Key: dbData?.id.toString(),
          ContentType: contentType,
        })
      );

      // Create result object
      const result = {
        key: dbData?.id,
        uploadID: r2Data.UploadId,
      };

      return new BaseResponse(STATUS_CODE.OK, true, 'Start multipart upload successfully', result);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getMultipartPresignedUrl(body: any) {
    try {
      const key: number = body.key;
      const uploadID: string = body.uploadID;
      const totalPart: number = body.totalPart;

      if (
        key === null || // key can be 0
        !uploadID ||
        totalPart === null // totalPart can be 0
      )
        throw new Error('Invalid request');

      const presignedUrls: string[] = [];

      for (let i = 1; i <= totalPart; i++) {
        const presignedUrl = await getSignedUrl(
          this.r2,
          new UploadPartCommand({
            Bucket: BucketService.R2_BUCKET_NAME,
            Key: key.toString(),
            PartNumber: i,
            UploadId: uploadID,
          }),
          {
            expiresIn: 60 * 30, // 30 minutes
          }
        );

        presignedUrls.push(presignedUrl);
      }

      return new BaseResponse(STATUS_CODE.OK, true, 'Get presigned urlsuccessfully', presignedUrls);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async finishMultipartUpload(body: any) {
    try {
      const key: number = body.key;
      const uploadID: string = body.uploadID;
      const parts: { ETag: string; PartNumber: number }[] = body.parts;

      if (
        key === null || // key can be 0
        !uploadID ||
        !parts ||
        parts.length === 0
      )
        throw new Error('Invalid request');

      await this.r2.send(
        new CompleteMultipartUploadCommand({
          Bucket: BucketService.R2_BUCKET_NAME,
          Key: key.toString(),
          MultipartUpload: {
            Parts: parts,
          },
          UploadId: uploadID,
        })
      );

      await this.repository.patchEntity({
        id: key,
        uploadStatus: true,
      });

      return new BaseResponse(STATUS_CODE.OK, true, 'Finish multipart upload successfully');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async abortMultipartUpload(body: any) {
    try {
      const key: number = body.key;
      const uploadID: string = body.uploadID;

      if (
        key === null || // key can be 0
        !uploadID
      )
        throw new Error('Invalid request');

      await this.r2.send(
        new AbortMultipartUploadCommand({
          Bucket: BucketService.R2_BUCKET_NAME,
          Key: key.toString(),
          UploadId: uploadID,
        })
      );

      await this.repository.delete({ id: key });

      return new BaseResponse(STATUS_CODE.OK, true, 'Abort multipart upload successfully');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getFile(id: number) {
    try {
      const data = await this.repository.getByEntity({ id });
      if (!data || !data.uploadStatus) throw new Error('File does not exist');

      const url = await getSignedUrl(
        this.r2,
        new GetObjectCommand({
          Bucket: BucketService.R2_BUCKET_NAME,
          Key: id.toString(),
          ResponseContentDisposition: `inline; filename=${data.filename}`,
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
      const data = await this.repository.getByEntity({ id });
      if (!data) throw new Error('File does not exist');

      await this.r2.send(
        new DeleteObjectCommand({
          Bucket: BucketService.R2_BUCKET_NAME,
          Key: id.toString(),
        })
      );

      await this.repository.delete({ id });

      return new BaseResponse(STATUS_CODE.OK, true, 'Delete file successfully');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const bucketService = new BucketService();
export default bucketService;
