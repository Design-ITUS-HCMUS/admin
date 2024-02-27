import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { prisma } from '@prismaClient';

export default class SubmissionRepository {
  private model: Prisma.SubmissionDelegate<DefaultArgs>;
  constructor() {
    this.model = prisma.submission;
  }

  async add(entity: Prisma.SubmissionUncheckedCreateInput) {
    try {
      return await this.model.create({
        data: entity,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAll() {
    try {
      return await this.model.findMany();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.SubmissionWhereUniqueInput, include: Prisma.SubmissionInclude = {}) {
    try {
      return await this.model.findUnique({
        where: entity,
        include,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getManyByEntity(entity: Prisma.SubmissionWhereInput, select: Prisma.SubmissionSelect = {}) {
    try {
      return await this.model.findMany({
        where: entity,
        select,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(entity: Prisma.SubmissionWhereUniqueInput) {
    try {
      return await this.model.delete({
        where: entity,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(entity: Partial<Prisma.SubmissionUncheckedCreateInput>) {
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
}
