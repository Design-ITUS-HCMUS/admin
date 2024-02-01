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
      const newUser = await this.model.create({
        data: entity,
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

  async update(entity: Partial<Prisma.UserUncheckedCreateInput>) {
    try {
      const user = await this.model.update({
        where: { id: entity.id },
        data: entity,
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
