import AccountEventRepository from '@repositories/accountEventRepository';
import EventRepository from '@repositories/eventRepository';
import TeamRepository from '@repositories/teamRepository';
import bcrypt from 'bcryptjs';

import { Team } from '@/interfaces/team';
import { STATUS_CODE } from '@/utils';
import BaseResponse from '@/utils/baseResponse';

class TeamService {
  private repository: TeamRepository;
  private eventRepository: EventRepository;
  private accountEventRepository: AccountEventRepository;

  constructor() {
    this.repository = new TeamRepository();
    this.eventRepository = new EventRepository();
    this.accountEventRepository = new AccountEventRepository();
  }

  async createTeam(data: Team) {
    try {
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

  async joinTeam(userID: number, inviteCode: string, eventID: number) {
    try {
      const team = await this.repository.getByEntity({ inviteCode });
      if (!team) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Team not found');
      }
      const members = (await this.getAllMembersByTeamId(team.id)).data;
      if (members.length >= 4) {
        return new BaseResponse(STATUS_CODE.FORBIDDEN, false, 'Team is full');
      }
      const existedMember = members.find((member: any) => member.user.id === userID);
      if (existedMember) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'You are already in this team');
      }
      const updatedTeam = await this.repository.update(team.id, { accountEvents: { create: { userID, eventID } } });
      if (!updatedTeam) {
        return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, 'Join team failed');
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
      const teams = await this.repository.getManyByEntity(
        { accountEvents: { some: { eventID: event.id } } },
        { id: true, name: true, category: true, paymentStatus: true }
      );
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

  async deleteMember(teamID: number, ownerID: number, eventID: number, userID: number) {
    try {
      const team = await this.repository.getByEntity({ id: teamID }, { accountEvents: true });
      const owner = team?.accountEvents[0];
      if (owner?.userID !== ownerID) {
        return new BaseResponse(
          STATUS_CODE.FORBIDDEN,
          false,
          'User is not the owner of the team, cannot delete member'
        );
      }
      if (owner?.userID === userID) {
        return new BaseResponse(STATUS_CODE.FORBIDDEN, false, 'Owner cannot delete himself');
      }

      const accountEvent = await this.accountEventRepository.getByEntity({ teamID, id: { userID, eventID } });
      if (!accountEvent) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Member not found');
      }
      const deletedMember = await this.accountEventRepository.delete({ userID, eventID });
      return new BaseResponse(STATUS_CODE.OK, true, 'Member deleted successfully', deletedMember);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const teamService = new TeamService();
export default teamService;
