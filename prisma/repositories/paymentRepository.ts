import { prisma } from "../client"
import { IPayment } from '@/interfaces/payment'

export default class PaymentRepository {
    private model: any;

    constructor() {
        this.model = prisma.payment
    }

    async add(entity: Partial<IPayment>) {
        try {
            const newPayment = await this.model.create({
                data: entity,
            });
            return newPayment;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async delete(entity: Partial<IPayment>) {
        try {
            const deletedPayment = await this.model.delete({
                where: entity,
            });
            return deletedPayment;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async patch(entity: Partial<IPayment>) {
        try {
            const patchedPayment = await this.model.update({
                where: { id: entity.id },
                data: entity,
            });
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getAll() {
        try {
            const allPayments = await this.model.findMany();
            return allPayments;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getByEntity(entity: Partial<IPayment>) {
        try {
            const payment = await this.model.findUnique({
                where: entity,
            });
            return payment;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async getCurrentID() {
        try {
            const object = await this.model.findFirst({
                select: {
                    id: true
                },
                orderBy: {
                    id: 'desc'
                }
            });
        
            return object ? object.id : 0;
        } catch (error) {
            console.log(error);
            return null
        }
    }
}