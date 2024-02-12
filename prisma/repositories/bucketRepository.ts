import { prisma } from '@prismaClient';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export default class BucketRepository {
  private model: Prisma.BucketDelegate<DefaultArgs>;

  constructor() {
    this.model = prisma.bucket;
  }

  async add(entity: Prisma.BucketUncheckedCreateInput) {
    try {
      return await this.model.create({
        data: entity,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(entity: Prisma.BucketWhereUniqueInput) {
    try {
      return await this.model.delete({
        where: entity,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async patchEntity(entity: Partial<Prisma.BucketUncheckedCreateInput>) {
    try {
      return await this.model.update({
        where: { id: entity.id },
        data: entity,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.BucketWhereUniqueInput) {
    try {
      return await this.model.findUnique({
        where: entity,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
