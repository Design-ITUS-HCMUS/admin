import prisma from '../client';

interface  IUserRepository {
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
    this.model = prisma.user
  }

    async add(entity: Partial<IUserRepository>) {
    try {
      const newUser = await this.model.create({
        data: entity,
      });
      return newUser;
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async getAll() {
    try {
      const allUsers = await this.model.findMany();
      return allUsers;
    } catch (error) {
      console.log(error);
      return null
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
      return null
    }
  }
}
