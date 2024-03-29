import PaymentRepository from '@repositories/paymentRepository';
import TeamRepository from '@repositories/teamRepository';
import payOSPaymentService from './payOSPaymentService';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils/enum';

class PaymentService {
  private paymentRepository: PaymentRepository;
  private teamRepository: TeamRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.teamRepository = new TeamRepository();
  }

  async createTransaction(body: any) {
    try {
      const teamId = body.teamID;

      const team = await this.teamRepository.getByEntity({ id: teamId });
      if (!team) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Team does not exist');
      }
      if (team.paymentID) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Payment already exists');
      }

      const paymentLink = await payOSPaymentService.createPaymentLink(body);
      return new BaseResponse(STATUS_CODE.OK, true, 'Payment transaction', paymentLink);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async verifyPayment(body: any) {
    try {
      const teamId = body.teamID;
      const team = await this.teamRepository.getByEntity({ id: teamId }, { payment: true });
      if (!team) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Team does not exist');
      }
      if (!team.paymentID) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'No payment to verify');
      }
      if (!team.paymentProof) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'No payment proof to verify');
      }
      if (team.payment?.paymentStatus !== 1) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Payment not paid or already verified');
      }

      //Update the payment status from false (not verified) to true (verified)
      const response = await this.teamRepository.update(teamId, { paymentStatus: true });
      return new BaseResponse(STATUS_CODE.OK, true, 'Payment verified', response);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getPaymentByBuyerID(body: any) {
    try {
      const response = await this.paymentRepository.getByBuyerID(body.buyerID);

      return new BaseResponse(STATUS_CODE.OK, true, 'Get payment by buyerID', response);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const paymentService = new PaymentService();
export default paymentService;
