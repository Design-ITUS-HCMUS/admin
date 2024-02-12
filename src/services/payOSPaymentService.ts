import PaymentRepository from '@repositories/paymentRepository';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils/enum';
import { CheckoutRequestType, WebhookType } from '@/interfaces/payOS';
import { getUnixTimeStamp, calcTotalPrice } from '@/utils/payOSUtils';
import PayOS from '@payos/node';
import authService from './authService';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

class PayOSPaymentService {
  private repository: PaymentRepository;

  private static readonly PAYOS_CLIENT_ID = String(process.env.PAYOS_CLIENT_ID);
  private static readonly PAYOS_API_KEY = String(process.env.PAYOS_API_KEY);
  private static readonly PAYOS_CHECKSUM_KEY = String(process.env.PAYOS_CHECKSUM_KEY);
  private static readonly PAYOS_CANCEL_URL = String(process.env.PAYOS_CANCEL_URL);
  private static readonly PAYOS_RETURN_URL = String(process.env.PAYOS_RETURN_URL);
  private static readonly PAYOS_WEBHOOK_URL = String(process.env.PAYOS_WEBHOOK_URL);

  private static readonly payOS = new PayOS(
    PayOSPaymentService.PAYOS_CLIENT_ID,
    PayOSPaymentService.PAYOS_API_KEY,
    PayOSPaymentService.PAYOS_CHECKSUM_KEY
  );

  constructor() {
    this.repository = new PaymentRepository();
    PayOSPaymentService.payOS.confirmWebhook(PayOSPaymentService.PAYOS_WEBHOOK_URL).catch((err: any) => {
      console.error(err);
    });
  }

  async createPaymentLink(body: any, token: RequestCookie | undefined) {
    try {
      // Get data from cookie
      const payload = await authService.getDataFromToken(token);
      if (!payload) return new BaseResponse(STATUS_CODE.FORBIDDEN, false, 'Permission denied');

      // Get data from payload
      const buyerID = Number(payload.id);

      // Get data from body
      const description = body.description;
      const items = body.items;

      if (
        buyerID === null || // buyerID can be 0
        !description ||
        !items
      )
        throw new Error('Invalid request');

      const cancelUrl = PayOSPaymentService.PAYOS_CANCEL_URL;
      const returnUrl = PayOSPaymentService.PAYOS_RETURN_URL;

      // Calculate total price
      const amount = calcTotalPrice(items);

      // Get first available orderCode
      const currentID = await this.repository.getCurrentID();
      if (currentID === null) throw new Error('Get currentID failed'); // currentID can be 0
      let orderCode = currentID + 1;

      // Start timer
      const startTime = Date.now();

      while (true) {
        // If time out (1 min) -> Return error
        if (Date.now() - startTime > 60000)
          return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, 'Time out');

        // Create payOS checkout object
        const payOSCheckout: CheckoutRequestType = {
          orderCode,
          amount,
          description,
          items,
          cancelUrl,
          returnUrl,
          expiredAt: getUnixTimeStamp() + 600, // 10 minutes per transaction
        };

        try {
          const response = await PayOSPaymentService.payOS.createPaymentLink(payOSCheckout);

          // If that payment is available -> Create new entry in database
          try {
            await this.repository.add({
              id: orderCode,
              buyerID,
              paymentID: response.paymentLinkId,
              gateway: 'PayOS',
              amount,
              description,
            });
          } catch (err: any) {
            // This catch block is to handle database error only
            return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
          }

          // Return result if success
          return new BaseResponse(STATUS_CODE.OK, true, 'Payment link created successfully', response);
        } catch (err: any) {
          // This catch block is to handle PayOS.createPaymentLink() error only
          // If that payment already existed -> Inc orderCode
          // Otherwise -> Try again with the same orderCode
          if (err.message === 'Đơn thanh toán đã tồn tại') orderCode++;
        }
      }
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async handleWebhookEvent(body: any) {
    try {
      // If default webhook -> Pass it
      if (body.signature === '2ddc42638e5efe5dc562c49d538598227c75db17deaa618b1a8d408517c881fd')
        return new BaseResponse(STATUS_CODE.OK, true, 'Default webhook data by PayOS');

      const webhookData: WebhookType = PayOSPaymentService.payOS.verifyPaymentWebhookData(body);

      // If wekhookData is verified -> Check if is updated or not
      // If updated -> Pass it
      const payment = await this.repository.getByEntity({ id: webhookData.orderCode });
      if (!payment) throw new Error('Get payment failed');
      if (payment.paymentStatus === 1)
        return new BaseResponse(STATUS_CODE.OK, true, 'Webhook event has been handled before');

      // Update payment status
      await this.repository.patch({
        id: webhookData.orderCode,
        accountNumber: webhookData.accountNumber,
        reference: webhookData.reference,
        paidAt: new Date(webhookData.transactionDateTime),
        paymentStatus: 1,
      });

      return new BaseResponse(STATUS_CODE.OK, true, 'Webhook event handled successfully');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const payOSPaymentService = new PayOSPaymentService();
export default payOSPaymentService;
