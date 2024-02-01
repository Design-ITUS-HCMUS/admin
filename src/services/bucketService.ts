import BucketRepository from '@repositories/bucketRepository';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils/enum';

class BucketService {
  private repository: BucketRepository;

  constructor() {
    this.repository = new BucketRepository();
  }

  async getByteArray(file: File) {
    const buffer = await file.arrayBuffer();
    return Buffer.from(buffer);
  }

  convertToBase64(buffer: Buffer) {
    return Buffer.from(buffer).toString('base64');
  }

  async saveItems(items: FormDataEntryValue[]) {
    try {
      let idArr: number[] = [];

      items.forEach(async (item: FormDataEntryValue) => {
        const entity = {
          filename: (item as File).name,
          type: (item as File).type,
          data: await this.getByteArray(item as File),
        };

        const retItem = await this.repository.add(entity);
        if (retItem === null || retItem === undefined) 
          throw new Error('Save items failed');

        idArr.push(retItem.id);
      });

      return new BaseResponse(STATUS_CODE.OK, true, 'Save items successfully', idArr);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async deleteItem(id: number) {
    try {
      await this.repository.delete({ id });
      return new BaseResponse(STATUS_CODE.OK, true, 'Delete item successfully');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async deleteItems(ids: number[]) {
    try {
      for (let i = 0; i < ids.length; i++) {
        await this.repository.delete({ id: ids[i] });
      }

      return new BaseResponse(STATUS_CODE.OK, true, 'Delete items successfully');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getFiles(ids: number[]) {
    try {
      let files: any[] = [];

      for (let i = 0; i < ids.length; i++) {
        const file = await this.repository.getByEntity({ id: ids[i] });

        if (file === null || file === undefined)
          throw new Error('Get files failed');

        // Convert data from byteA to base64
        const base64File = {
          ...file,
          data: this.convertToBase64(file.data),
        }

        files.push(base64File);
      }

      return new BaseResponse(STATUS_CODE.OK, true, 'Get files successfully', files);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const bucketService = new BucketService();
export default bucketService;

// Source:
//    1: https://www.codeconcisely.com/posts/nextjs-file-upload/
//    2: https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types#working-with-bytes
