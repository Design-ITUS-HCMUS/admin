import EventRepository from '@repositories/eventRepository';
import TeamRepository from '@repositories/teamRepository';

import { Team } from '@/interfaces/team';
import { STATUS_CODE } from '@/utils';
import BaseResponse from '@/utils/baseResponse';

class TeamService {
  private repository: TeamRepository;
  private eventRepository: EventRepository;

  constructor() {
    this.repository = new TeamRepository();
    this.eventRepository = new EventRepository();
  }

  async createTeam(data: Team) {
    try {
      const { name } = data;
      const existedTeam = await this.repository.getByEntity({ name });
      if (existedTeam) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Team already exists');
      }
      const team = await this.repository.add(data);
      return new BaseResponse(STATUS_CODE.OK, true, 'Team created successfully', team);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getAllTeamsByEventID(eventID: number) {
    try {
      const event = await this.eventRepository.getByEntity({ id: eventID });
      if (!event) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Event not found');
      }
      const teams = await this.repository.getManyByEntity({ accountEvents: { some: { eventID } } });
      if (!teams) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Teams not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Teams found', teams);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getTeamById(id: number) {
    try {
      const team = await this.repository.getByEntity({ id });
      if (!team) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Team not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Team found', team);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async updateTeam(id: number, data: Team) {
    try {
      let team = await this.repository.getByEntity({ id });
      if (!team) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Team not found');
      }
      team = await this.repository.getByEntity({ name: data.name });
      if (team && team.id !== id) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Team name already exists');
      }
      const updatedTeam = await this.repository.update(id, data);
      return new BaseResponse(STATUS_CODE.OK, true, 'Team updated successfully', updatedTeam);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const teamService = new TeamService();
export default teamService;
