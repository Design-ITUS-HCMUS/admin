import { prisma } from '../client';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

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

  async getManyByEntity(entity: Prisma.TeamWhereInput) {
    try {
      const teams = await this.model.findMany({
        where: entity,
      });
      return teams;
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
      return null;
    }
  }
}
