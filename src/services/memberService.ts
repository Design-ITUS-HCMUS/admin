import AccountEventRepository from '@repositories/accountEventRepository';

import { STATUS_CODE } from '@/utils';
import BaseResponse from '@/utils/baseResponse';

class MemberService {
  private accountEventRepository: AccountEventRepository;
  constructor() {
    this.accountEventRepository = new AccountEventRepository();
  }

  async getEventInfoById(id: number) {
    try {
      const accountEvents = await this.accountEventRepository.getByEntity(
        { id, teamID: null },
        {
          role: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              email: true,
              profile: true,
            },
          },
          department: true,
        }
      );
      if (!accountEvents) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Organizer not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Organizer found', accountEvents);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const memberService = new MemberService();
export default memberService;
