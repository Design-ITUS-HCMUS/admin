import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { prisma } from '../client';

export default class RoleActivityRepository {
  private model: Prisma.RoleActivityDelegate<DefaultArgs>;
  constructor() {
    this.model = prisma.roleActivity;
  }

  async add(entity: Prisma.RoleActivityCreateInput) {
    try {
      const newRoleActivity = await this.model.create({
        data: entity,
      });
      return newRoleActivity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll() {
    try {
      const allRoleActivities = await this.model.findMany();
      return allRoleActivities;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.RoleActivityWhereUniqueInput) {
    try {
      const roleActivity = await this.model.findUnique({
        where: entity,
      });
      return roleActivity;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
