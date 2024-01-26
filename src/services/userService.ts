import UserRepository from '@repositories/userRepository';
import BaseRespone  from '@/utils/baseRespone'
import { STATUS_CODE } from '@/utils/enum';
import { CreateUser } from '@/interface/createUser'

class UserService {
  private repository: any;

  constructor() {
    this.repository = new UserRepository();
  }
  async createAccount(data: CreateUser) {
    try {
      const { username, email } = data;
      const existedUser = await this.repository.getByEntity({ username, email });
      if (existedUser) {
        return new BaseRespone(STATUS_CODE.CONFLICT, false, "User already exists")
      }
      const user = await this.repository.add(data);
      return new BaseRespone(STATUS_CODE.OK, true, "User created successfully", user)
    } catch (err: any) {
      return new BaseRespone(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message)
    }
  }

  async getUserById(id: number) {
     try {
       const user = await this.repository.getByEntity({ id });
        if (!user) {
          return new BaseRespone(STATUS_CODE.NOT_FOUND, false, "User not found")
        }
        return new BaseRespone(STATUS_CODE.OK, true, "User found", user)
     } catch (err: any) {
       return new BaseRespone(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message)
     }
  }
}

const userService = new UserService();
export default userService;