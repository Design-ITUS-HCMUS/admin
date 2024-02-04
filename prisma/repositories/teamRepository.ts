import { DefaultArgs } from '@prisma/client/runtime/library';
import { prisma } from '../client';
import { Prisma } from '@prisma/client';

export default class TeamRepository {
  private model: Prisma.TeamDelegate<DefaultArgs>;
  constructor() {
    this.model = prisma.team;
  }

  async add(entity: Prisma.TeamCreateInput) {
    try {
      const newTeam = await this.model.create({
        data: entity,
      });
      return newTeam;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll() {
    try {
      const allTeams = await this.model.findMany();
      return allTeams;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.TeamWhereUniqueInput) {
    try {
      const team = await this.model.findUnique({
        where: entity,
      });
      return team;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(entity: Prisma.TeamUncheckedUpdateInput) {
    try {
      const team = await this.model.update({
        where: {
          id: entity.id as number,
        },
        data: entity,
      });
      return team;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: number) {
    try {
      const deleteTeam = await this.model.delete({
        where: {
          id: id,
        },
      });
      return deleteTeam;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
