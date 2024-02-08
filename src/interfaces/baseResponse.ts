import { STATUS_CODE } from '@/utils';

export interface IBaseResponse {
  status: keyof typeof STATUS_CODE;
  success: boolean;
  message: string;
  data: any;
}

export interface IBaseResponseBody {
  success: boolean;
  message: string;
  data: any;
}