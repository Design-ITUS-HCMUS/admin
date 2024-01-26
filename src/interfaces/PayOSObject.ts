export interface PayOSObject {
  orderCode: number;
  amount: number;
  description: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  buyerAddress?: string;
  items?: { name: string; quantity: number; price: number }[];
  cancelUrl: string;
  returnUrl: string;
  expiredAt?: number;
  signature?: string;
}
