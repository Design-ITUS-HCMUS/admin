export interface Team {
  name: string;
  status: boolean;
  category: string;
  paymentID?: any;
  paymentStatus: boolean;
  paymentProof?: number;
  submission?: number[];
}
