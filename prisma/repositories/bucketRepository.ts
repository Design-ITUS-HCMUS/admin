import { prisma } from '../client';

export interface IBucket {
  id: number;
  filename: string;
  type: string;
  data: Buffer;
  createAt: Date;
}

export default class BucketRepository {
  private model: any;

  constructor() {
    this.model = prisma.bucket;
  }

  async add(entity: Partial<IBucket>) {
    try {
      return await this.model.create({
        data: entity,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(entity: Partial<IBucket>) {
    try {
      return await this.model.delete({
        where: entity,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async patchEntity(entity: Partial<IBucket>) {
    try {
      return await this.model.update({
        where: { id: entity.id },
        data: entity,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getByEntity(entity: Partial<IBucket>) {
    try {
      return await this.model.findUnique({
        where: entity,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
