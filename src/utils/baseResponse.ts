import { STATUS_CODE } from '@/utils/enum';

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
