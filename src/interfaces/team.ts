export interface Team {
  name: string;
  status: boolean;
  category: string;
  paymentID?: any;
  paymentStatus: number;
  paymentProof?: number;
  submission?: number[];
}
