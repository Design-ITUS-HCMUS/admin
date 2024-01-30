import { STATUS_CODE } from '@/utils/enum';
interface IBaseResponse {
  status: keyof typeof STATUS_CODE;
  success: boolean;
  message: string;
  data: any;
}

export default class BaseResponse {
  status: number;
  success: boolean;
  message: string;
  data: any;

  constructor(status?: number, success?: boolean, message?: string, data?: any) {
    this.status = status || STATUS_CODE.INTERNAL_SERVER_ERROR;
    this.success = success || false;
    this.message = message || '';
    this.data = data || '';
  }

  responseBody() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}
