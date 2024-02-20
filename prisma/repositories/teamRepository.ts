import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

import { prisma } from '../client';

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
      console.error(error);
      return null;
    }
  }

  async getAll() {
    try {
      const allTeams = await this.model.findMany();
      return allTeams;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getByEntity(entity: Prisma.TeamWhereUniqueInput, include: Prisma.TeamInclude = {}) {
    try {
      const team = await this.model.findUnique({
        where: entity,
        include,
      });
      return team;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getManyByEntity(entity: Prisma.TeamWhereInput, select: Prisma.TeamSelect = {}) {
    try {
      const teams = await this.model.findMany({
        where: entity,
        select,
      });
      return teams;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(id: number, entity: Prisma.TeamUpdateInput) {
    try {
      const updatedTeam = await this.model.update({
        where: { id },
        data: entity,
      });
      return updatedTeam;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(id: number) {
    try {
      const deletedTeam = await this.model.delete({
        where: { id },
      });
      return deletedTeam;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
