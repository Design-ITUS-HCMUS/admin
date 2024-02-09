import { IPayment } from '@/interfaces/payment';
import { prisma } from '../client';

export default class PaymentRepository {
  private model: any;

  constructor() {
    this.model = prisma.payment;
  }

  async add(entity: Partial<IPayment>) {
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

  async delete(entity: Partial<IPayment>) {
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

  async patch(entity: Partial<IPayment>) {
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

  async getByEntity(entity: Partial<IPayment>) {
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
