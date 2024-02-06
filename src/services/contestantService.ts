import { STATUS_CODE } from '@/utils';
import BaseResponse from '@/utils/baseResponse';
import AccountEventRepository from '@repositories/accountEventRepository';

class ContestantService {
  private accountEventRepository: AccountEventRepository;
  constructor() {
    this.accountEventRepository = new AccountEventRepository();
  }

  async getInfoById(id: number) {
    try {
      const accountEvents = await this.accountEventRepository.getByEntity(
        { id, teamID: { not: null } },
        {
          user: {
            select: {
              email: true,
              profile: true,
            },
          },
          team: true,
        }
      );
      if (!accountEvents) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Contestant not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Contestant found', accountEvents);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const contestantService = new ContestantService();
export default contestantService;
