import { prisma } from '@prismaClient';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export default class PaymentRepository {
  private model: Prisma.PaymentDelegate<DefaultArgs>;

  constructor() {
    this.model = prisma.payment;
  }

  async add(entity: Prisma.PaymentCreateInput) {
    try {
      const newPayment = await this.model.create({
        data: entity,
      });
      return newPayment;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(entity: Prisma.PaymentWhereUniqueInput) {
    try {
      const deletedPayment = await this.model.delete({
        where: entity,
      });
      return deletedPayment;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async patch(entity: Partial<Prisma.PaymentUncheckedCreateInput>) {
    try {
      const patchedPayment = await this.model.update({
        where: { id: entity.id },
        data: entity,
      });
      return patchedPayment;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAll() {
    try {
      const allPayments = await this.model.findMany();
      return allPayments;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.PaymentWhereUniqueInput) {
    try {
      const payment = await this.model.findUnique({
        where: entity,
      });
      return payment;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getByBuyerID(buyerID: number) {
    try {
      const payment = await this.model.findMany({
        where: {
          buyerID,
        },
      });
      return payment;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getCurrentID() {
    try {
      const object = await this.model.findFirst({
        select: {
          id: true,
        },
        orderBy: {
          id: 'desc',
        },
      });

      return object ? object.id : 0;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
