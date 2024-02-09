import AccountEventRepository from '@repositories/accountEventRepository';
import { AccountEvent } from '@/interfaces/accountEvent';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils';
import EventRepository from '@repositories/eventRepository';

class AccountEventService {
  private repository: AccountEventRepository;
  private eventRepository: EventRepository;
  constructor() {
    this.repository = new AccountEventRepository();
    this.eventRepository = new EventRepository();
  }

  async createAccountEvent(data: AccountEvent) {
    try {
      const { userID, eventID } = data;
      const existedAccountEvent = await this.repository.getByEntity({ userID, eventID });
      if (existedAccountEvent) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'AccountEvent already exists');
      }
      const accountEvent = await this.repository.add(data);
      return new BaseResponse(STATUS_CODE.OK, true, 'AccountEvent created successfully', accountEvent);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getContestantsByEventID(eventID: number) {
    try {
      const event = await this.eventRepository.getByEntity({ id: eventID });
      if (!event) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Event not found');
      }
      const accountEvents = await this.repository.getManyByEntity(
        { eventID, user: { roleID: 3 } },
        {
          id: true,
          team: {
            select: {
              name: true,
              category: true,
            },
          },
          user: {
            select: {
              email: true,
              profile: {
                select: {
                  fullName: true,
                  school: true,
                },
              },
            },
          },
        }
      );
      return new BaseResponse(STATUS_CODE.OK, true, 'Get all contestants successfully', accountEvents);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getOrganizersByEventID(eventID: number) {
    try {
      const event = await this.eventRepository.getByEntity({ id: eventID });
      if (!event) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Event not found');
      }
      const accountEvents = await this.repository.getManyByEntity(
        { eventID, user: { roleID: { not: 3 } } },
        {
          id: true,
          role: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              profile: {
                select: {
                  fullName: true,
                },
              },
            },
          },
          department: true,
        }
      );
      if (!accountEvents) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Organizers not found');
      }
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
