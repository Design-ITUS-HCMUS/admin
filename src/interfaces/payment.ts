export interface IPayment {
    id?: number; // auto increment
    buyerID: number;
    paymentID?: string;
    gateway: string;
    amount: number;
    description: string;
    accountNumber?: string;
    reference?: string;
    paidAt?: Date;
    createdAt?: Date; // auto create
    paymentStatus?: 0 | 1; // Default = 0
}