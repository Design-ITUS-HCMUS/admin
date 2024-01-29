import UserRepository from '@repositories/userRepository';
import BaseResponse  from '@/utils/baseRespone'
import { STATUS_CODE } from '@/utils/enum';
import { CreateUser } from '@/interfaces/createUser'

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
        return new BaseResponse(STATUS_CODE.CONFLICT, false, "User already exists")
      }
      const user = await this.repository.add(data);
      return new BaseResponse(STATUS_CODE.OK, true, "User created successfully", user)
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message)
    }
  }

  async getUserById(id: number) {
     try {
       const user = await this.repository.getByEntity({ id });
        if (!user) {
          return new BaseResponse(STATUS_CODE.NOT_FOUND, false, "User not found")
        }
        return new BaseResponse(STATUS_CODE.OK, true, "User found", user)
     } catch (err: any) {
       return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message)
     }
  }
}

const userService = new UserService();
export default userService;