import TeamRepository from '@repositories/teamRepository';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils';
import { Team } from '@/interfaces/team';

class TeamService {
  private teamRepository: TeamRepository;

  constructor() {
    this.teamRepository = new TeamRepository();
  }

  async createTeam(data: Team) {
    try {
      const { name } = data;
      const existedTeam = await this.teamRepository.getByEntity({ name });
      if (existedTeam) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Team already exists');
      }
      const team = await this.teamRepository.add(data);
      return new BaseResponse(STATUS_CODE.OK, true, 'Team created successfully', team);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getTeamById(id: number) {
    try {
      const team = await this.teamRepository.getByEntity({ id });
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
      let team = await this.teamRepository.getByEntity({ id });
      if (!team) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, 'Team not found');
      }
      team = await this.teamRepository.getByEntity({ name: data.name });
      if (team && team.id !== id) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, 'Team name already exists');
      }
      const updatedTeam = await this.teamRepository.update(id, data);
      return new BaseResponse(STATUS_CODE.OK, true, 'Team updated successfully', updatedTeam);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const teamService = new TeamService();
export default teamService;
