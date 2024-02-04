import PaymentRepository from '@repositories/paymentRepository';
import TeamRepository from '@repositories/teamRepository';
import { payOS } from '@payOS';
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
      const orderId = body.data.orderCode;

      const paymentInfo = await this.paymentRepository.getByEntity({ id: orderId });
      if (!paymentInfo) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Payment does not exist');
      }

      const team = await this.teamRepository.getByEntity({ teamLead: paymentInfo.buyerID });
      if (!team) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Team does not exist');
      }
      if (team.paymentID) {
        this.paymentRepository.delete({ id: orderId });
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Payment already exists');
      }

      if (paymentInfo.paymentStatus === 1) {
        const updatedTeam = await this.teamRepository.update({ id: team?.id, status: 1, paymentStatus: 1 });
        return new BaseResponse(STATUS_CODE.OK, true, 'Team payment status updated', updatedTeam);
      }

      const response = await this.teamRepository.update({ id: team?.id, paymentID: paymentInfo.paymentID });
      return new BaseResponse(STATUS_CODE.OK, true, 'Payment transaction', response);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async verifyPayment(body: any) {
    try {
      const teamId = body.teamID;
      const team = await this.teamRepository.getByEntity({ id: teamId });
      if (!team) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Team does not exist');
      }

      const response = await this.teamRepository.update({ id: team?.id, status: 1, paymentStatus: 1 });
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
