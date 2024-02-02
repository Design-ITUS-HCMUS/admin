import UserRepository from '@repositories/userRepository';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE } from '@/utils/enum';
import { User } from '@/interfaces/user'

enum RoleID {
    ADMIN = 1,
    MEMBER = 2,
    CONTESTANT = 3,
}

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }
  async createUser(data: User) {
    try {
      const { username, email } = data;
      const existedUserName = await this.repository.getByEntity({ username });
      if (existedUserName) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, "Username existed");
      }
      const existedEmail = await this.repository.getByEntity({ email });
      if (existedEmail) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, "Email existed");
      }
      const user = await this.repository.add(data);
      if (!user) {
          throw new Error("create user failed");
      }
      return new BaseResponse(STATUS_CODE.OK, true, "User created successfully", user);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async getUserById(id: number) {
     try {
       const user = await this.repository.getByEntity({ id });
        if (!user) {
          return new BaseResponse(STATUS_CODE.NOT_FOUND, false, "User not found");
        }
        return new BaseResponse(STATUS_CODE.OK, true, "User found", user);
     } catch (err: any) {
       return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
     }
  }

  async getAllUsers() {
    try {
      const users = await this.repository.getAll();
      if (!users) {
        throw new Error("Fail to get data")
      }
      return new BaseResponse(STATUS_CODE.OK, true, "Users found", users);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async updateRoleUser(id: number, newRoleID: RoleID) {
      try {
        const user = await this.repository.getByEntity({ id });
        if (!user) {
          return new BaseResponse(STATUS_CODE.NOT_FOUND, false, "User not found");
        }
        const updatedUser = await this.repository.update({id, roleID: newRoleID});
        if(!updatedUser) {
            throw new Error("update role failed");
        }
        return new BaseResponse(STATUS_CODE.OK, true, "updated role successfully", updatedUser);
      } catch (err: any) {
        return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
      }
  }

  async updateUserInformation(id: number, data: Partial<User>) {
      try {
        const user = await this.repository.getByEntity({ id });
        if (!user) {
          return new BaseResponse(STATUS_CODE.NOT_FOUND, false, "User not found");
        }
        const { username, email } = data;
        if(username || email) {
          return new BaseResponse(STATUS_CODE.BAD_REQUEST, false, "Username and email cannot be updated");
        }
        const updatedUser = await this.repository.update({ id, ...data });
        if(!updatedUser) {
            throw new Error("update user failed");
        }
        return new BaseResponse(STATUS_CODE.OK, true, "updated user successfully", updatedUser);
      } catch (err: any) {
        return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
      }
  }

  async deleteUsers(ids: number[]) {
    try {
      const deletedUsers = await this.repository.delete(ids);
      if (!deletedUsers) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, "No user found");
      }
      return new BaseResponse(STATUS_CODE.OK, true, "Users deleted", deletedUsers);
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
}

const userService = new UserService();
export default userService;
