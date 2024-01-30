import { prisma } from '../client';

interface IUserRepository {
  id: number;
  username: string;
  fullName: string;
  email: string;
  password: string;
  studentID: string;
  school: string;
  roleID: number;
  createdAt: Date;
  createdBy: string;
  accountEvents: any;
}

export default class UserRepository {
  private model: any;
  constructor() {
    this.model = prisma.user;
  }

  async add(entity: Partial<IUserRepository>) {
    try {
      const newUser = await this.model.create({
        data: entity,
      });
      return newUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAll() {
    try {
      const allUsers = await this.model.findMany({
        orderBy: [
          {
            id: 'asc',
          },
        ],
        include: {
          accountEvents: true,
          role: true
        }
      });
      return allUsers;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getByEntity(entity: Partial<IUserRepository>) {
    try {
      const user = await this.model.findUnique({
        where: entity,
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(entity: Partial<IUserRepository>) {
    try {
      const user = await this.model.update({
        where: { id: entity.id },
        data: entity,
      });
      return user;
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async delete(entity: number[]) {
    try {
      const deletedUser = await this.model.deleteMany({
        where: {
          id: {
            in: entity
          }
        },
      });
      return deletedUser;
    } catch (error) {
      console.log(error);
      return null
    }
  }
}