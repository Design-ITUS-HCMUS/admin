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
      console.error(error);
      return null;
    }
  }

  async getAll() {
    try {
      const allAccountEvents = await this.model.findMany();
      return allAccountEvents;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.AccountEventWhereInput, select?: Prisma.AccountEventSelect) {
    try {
      const accountEvent = await this.model.findFirst({
        where: entity,
        select,
      });
      return accountEvent;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getManyByEntity(entity: Prisma.AccountEventWhereInput, select?: Prisma.AccountEventSelect) {
    try {
      const accountEvents = await this.model.findMany({
        where: entity,
        select,
      });
      return accountEvents;
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
      return null;
    }
  }
}
