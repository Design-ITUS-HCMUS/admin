import AccountEventRepository from '@repositories/accountEventRepository';
import { AccountEvent } from '@/interfaces/accountEvent';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils';
import TeamRepository from '@repositories/teamRepository';

class AccountEventService {
  private repository: AccountEventRepository;
  constructor() {
    this.repository = new AccountEventRepository();
  }

  async createAccountEvent(data: AccountEvent) {
    try {
      const { userId, eventID } = data;
      const existedAccountEvent = await this.repository.getByEntity({ userId, eventID });
      if (existedAccountEvent) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'AccountEvent already exists');
      }
      const accountEvent = await this.repository.add(data);
      return new BaseResponse(STATUS_CODE.OK, true, 'AccountEvent created successfully', accountEvent);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getContestantsByEventId(eventID: number) {
    try {
      const accountEvents = await this.repository.getManyByEntity({ eventID, teamID: { not: null } });
      return new BaseResponse(STATUS_CODE.OK, true, 'Get all contestants successfully', accountEvents);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getTeamsByEventId(eventID: number) {
    try {
      const accountEvents = await this.repository.getManyByEntity({ eventID, teamID: { not: null } });
      if (accountEvents) {
        const teamIDs = accountEvents && (accountEvents.map((accountEvent) => accountEvent.teamID) as number[]);
        const teamRepository = new TeamRepository();
        const teams = await teamRepository.getManyByEntity({ id: { in: teamIDs } });
        return new BaseResponse(STATUS_CODE.OK, true, 'Get all teams successfully', teams);
      }
      return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'No team found');
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getOrganizersByEventId(eventID: number) {
    try {
      const accountEvents = await this.repository.getManyByEntity({ eventID, teamID: null });
      return new BaseResponse(STATUS_CODE.OK, true, 'Get all organizers successfully', accountEvents);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async deleteAccountEvent(id: number) {
    try {
      const accountEvent = await this.repository.getByEntity({ id });
      if (!accountEvent) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'AccountEvent not found');
      }
      const deleteAccountEvent = await this.repository.delete(id);
      return new BaseResponse(STATUS_CODE.OK, true, 'AccountEvent deleted successfully', deleteAccountEvent);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const accountEventService = new AccountEventService();
export default accountEventService;
