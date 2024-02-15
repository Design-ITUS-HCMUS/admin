import AccountEventRepository from '@repositories/accountEventRepository';
import EventRepository from '@repositories/eventRepository';
import TeamRepository from '@repositories/teamRepository';
import bcrypt from 'bcryptjs';

import { Team } from '@/interfaces/team';
import { STATUS_CODE } from '@/utils';
import BaseResponse from '@/utils/baseResponse';
import authService from './authService';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

class TeamService {
  private repository: TeamRepository;
  private eventRepository: EventRepository;
  private accountEventRepository: AccountEventRepository;

  constructor() {
    this.repository = new TeamRepository();
    this.eventRepository = new EventRepository();
    this.accountEventRepository = new AccountEventRepository();
  }

  async createTeam(data: Team, token: RequestCookie | undefined) {
    try {
      const payload = await authService.getDataFromToken(token);
      if (!payload) return new BaseResponse(STATUS_CODE.UNAUTHORIZED, false, 'Invalid token');
      if (payload.role !== 3) return new BaseResponse(STATUS_CODE.FORBIDDEN, false, 'Permission denied');
      const { name } = data;
      const existedTeam = await this.repository.getByEntity({ name });
      if (existedTeam) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Team already exists');
      }
      let team = await this.repository.add(data);
      if (!team) {
        return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, 'Create team failed');
      }
      let inviteCode = await bcrypt.hash(String(team.id), Number(process.env.HASH_SALT_ROUNDS) || 10);
      inviteCode = inviteCode.slice(-8);
      team = await this.repository.update(team.id, { inviteCode });
      return new BaseResponse(STATUS_CODE.OK, true, 'Team created successfully', team);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async joinTeam(userID: number, teamID: number, eventID: number) {
    try {
      const team = await this.repository.getByEntity({ id: teamID });
      if (!team) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Team not found');
      }
      const members = (await this.getAllMembersByTeamId(teamID)).data;
      if (members.length >= 4) {
        return new BaseResponse(STATUS_CODE.FORBIDDEN, false, 'Team is full');
      }
      const updatedTeam = await this.repository.update(teamID, { accountEvents: { create: { userID, eventID } } });
      if (!updatedTeam) {
        return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, 'Join team failed');
      }
      // Remove invite code if team is full
      if (members.length === 3) {
        await this.repository.update(teamID, { inviteCode: null });
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Join team successfully', updatedTeam);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getAllTeamsByEventKey(key: string) {
    try {
      const event = await this.eventRepository.getByEntity({ key });
      if (!event) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Event not found');
      }
      const teams = await this.repository.getManyByEntity({ accountEvents: { some: { eventID: event.id } } });
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

  async getTeamByInviteCode(inviteCode: string) {
    try {
      const team = await this.repository.getByEntity({ inviteCode });
      if (!team) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Team not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Team found', team);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getAllMembersByTeamId(id: number) {
    try {
      const accountEvents = await this.accountEventRepository.getManyByEntity({ teamID: id }, { user: true });
      if (!accountEvents) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Members not found');
      }
      return new BaseResponse(STATUS_CODE.OK, true, 'Members found', accountEvents);
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

  async deleteTeam(id: number) {
    try {
      const team = await this.repository.getByEntity({ id });
      if (!team) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Team not found');
      }
      const deletedTeam = await this.repository.delete(id);
      return new BaseResponse(STATUS_CODE.OK, true, 'Team deleted successfully', deletedTeam);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const teamService = new TeamService();
export default teamService;
