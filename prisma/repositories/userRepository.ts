import { DefaultArgs } from '@prisma/client/runtime/library';
import { prisma } from '@prismaClient';
import { Prisma } from '@prisma/client';

export default class UserRepository {
  private model: Prisma.UserDelegate<DefaultArgs>;
  constructor() {
    this.model = prisma.user;
  }

  async add(entity: Prisma.UserCreateInput) {
    try {
      if (entity.profile) {
        entity.profile = {
          create: entity.profile,
        };
      }
      const newUser = await this.model.create({
        data: entity,
        include: {
          profile: true,
        },
      });
      return newUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAll() {
    try {
      const allUsers = await this.model.findMany({
        orderBy: [
          {
            id: 'asc',
          },
        ],
        select: {
          id: true,
          username: true,
          email: true,
          profile: true,
        },
      });
      return allUsers;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.UserWhereUniqueInput) {
    try {
      const user = await this.model.findUnique({
        where: entity,
        include: {
          accountEvents: true,
          role: true,
          profile: true,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(entity: Prisma.UserUncheckedUpdateInput) {
    try {
      if (entity.profile) {
        entity.profile = {
          upsert: {
            create: entity.profile,
            update: entity.profile,
          },
        };
      }
      const user = await this.model.update({
        where: {
          id: entity.id as number,
        },
        data: entity,
        include: {
          profile: true,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(entity: number[]) {
    try {
      const deletedUser = await this.model.deleteMany({
        where: {
          id: {
            in: entity,
          },
        },
      });
      return deletedUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
