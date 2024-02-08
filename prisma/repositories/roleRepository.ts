import { Prisma } from '@prisma/client';
import { prisma } from '../client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export default class RoleRepository {
  private model: Prisma.RoleDelegate<DefaultArgs>;
  constructor() {
    this.model = prisma.role;
  }

  async add(entity: Prisma.RoleCreateInput) {
    try {
      const newRole = await this.model.create({
        data: {
          name: entity.name,
          actions: {
            connect: entity.actions as any,
          },
          users: {
            connect: entity.users as any,
          },
        },
        include: {
          actions: true,
          users: true,
        },
      });
      return newRole;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAll() {
    try {
      const allRoles = await this.model.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              users: true,
              AccountEvent: true,
            },
          },
        },
      });
      return allRoles;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.RoleWhereUniqueInput) {
    try {
      const role = await this.model.findUnique({
        where: entity,
        include: {
          actions: true,
          users: true,
        },
      });
      return role;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(id: number, currentUsers: Prisma.UserWhereUniqueInput[], entity: Prisma.RoleUpdateInput) {
    try {
      // Change current users' role to default role
      await this.model.update({
        where: { id: 2 },
        data: {
          users: {
            connect: currentUsers,
          },
        },
      });
      // Set new users for role.
      const updatedRole = await this.model.update({
        where: {
          id,
        },
        data: {
          name: entity.name,
          actions: {
            set: entity.actions as any,
          },
          users: {
            set: entity.users as any,
          },
        },
        include: {
          actions: true,
          users: true,
        },
      });
      return updatedRole;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(id: number, users: Prisma.UserWhereUniqueInput[]) {
    try {
      await this.model.update({
        where: {
          id: 2,
        },
        data: {
          users: {
            connect: users,
          },
        },
      });
      const deletedRole = await this.model.delete({
        where: {
          id,
        },
      });
      return deletedRole;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
