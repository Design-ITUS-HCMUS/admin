import { DefaultArgs } from '@prisma/client/runtime/library';
import { prisma } from '../client';
import { Prisma } from '@prisma/client';

export default class UserRepository {
  private model: Prisma.UserDelegate<DefaultArgs>;
  constructor() {
    this.model = prisma.user;
  }

  async add(entity: Prisma.UserCreateInput) {
    try {
      if (entity.member) {
        entity.member = {
          create: entity.member,
        };
      }
      const newUser = await this.model.create({
        data: entity,
        include: {
          member: true,
        },
      });
      return newUser;
    } catch (error) {
      console.log(error);
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
        include: {
          accountEvents: true,
          role: true,
          member: true,
        },
      });
      return allUsers;
    } catch (error) {
      console.log(error);
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
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(entity: Prisma.UserUncheckedUpdateInput) {
    try {
      if (entity.member) {
        entity.member = {
          upsert: {
            create: entity.member,
            update: entity.member,
          },
        };
      }
      const user = await this.model.update({
        where: {
          id: entity.id as number,
        },
        data: entity,
        include: {
          member: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
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
      console.log(error);
      return null;
    }
  }
}
