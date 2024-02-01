import PaymentRepository from '@repositories/paymentRepository';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils/enum';
import { CheckoutRequestType, WebhookType } from '@/interfaces/payOS';
import { getUnixTimeStamp, calcTotalPrice } from '@/utils/payOSUtils';
import { payOS } from '@payOSClient';

class PayOSPaymentService {
  private repository: PaymentRepository;

  constructor() {
    this.repository = new PaymentRepository();
  }

  async createPaymentLink(body: any) {
    // Add maximum execution time later
    try {
      // Get data from body
      const buyerID = body.buyerID;
      const description = body.description;
      const items = body.items;

      const cancelUrl = 'https://google.com';
      const returnUrl = 'https://google.com';

      // Calculate total price
      const amount = calcTotalPrice(items);

      // Get first available orderCode
      let orderCode = (await this.repository.getCurrentID()) + 1;

      // Start timer
      // const startTime = Date.now();

      while (true) {
        // If time out (1 min) -> Return error
        // if (Date.now() - startTime > 60000)
        //   return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, 'Time out');

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
          const response = await payOS.createPaymentLink(payOSCheckout);

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

      const webhookData: WebhookType = payOS.verifyPaymentWebhookData(body);

      // If wekhookData is verified -> Check if is updated or not
      // If updated -> Pass it
      const payment = await this.repository.getByEntity({ id: webhookData.orderCode });
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
