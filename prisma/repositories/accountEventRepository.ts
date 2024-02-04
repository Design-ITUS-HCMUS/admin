import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { prisma } from '../client';

export default class AccountEventRepository {
  private model: Prisma.AccountEventDelegate<DefaultArgs>;
  constructor() {
    this.model = prisma.accountEvent;
  }
  async add(entity: Prisma.AccountEventUncheckedCreateInput) {
    try {
      const newAccountEvent = await this.model.create({
        data: entity,
      });
      return newAccountEvent;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll() {
    try {
      const allAccountEvents = await this.model.findMany();
      return allAccountEvents;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.AccountEventWhereInput) {
    try {
      const accountEvent = await this.model.findFirst({
        where: entity,
      });
      return accountEvent;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getManyByEntity(entity: Prisma.AccountEventWhereInput) {
    try {
      const accountEvents = await this.model.findMany({
        where: entity,
        include: {
          team: true,
          user: {
            include: {
              profile: true,
            },
          },
        },
      });
      return accountEvents;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(id: number, entity: Prisma.AccountEventUpdateInput) {
    try {
      const updatedAccountEvent = await this.model.update({
        where: { id },
        data: entity,
      });
      return updatedAccountEvent;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: number) {
    try {
      const deletedAccountEvent = await this.model.delete({
        where: { id },
      });
      return deletedAccountEvent;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
