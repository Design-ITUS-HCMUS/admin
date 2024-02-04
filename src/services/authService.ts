import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import CommonService from '@/services/commonService';
import UserRepository from '@repositories/userRepository';
import { AccountInformation, User } from '@/interfaces/user';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE, areAllFieldsNotNull } from '@/utils';

class AuthService {
  private repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }
  async sendOTP(email: string) {
    try {
      if (!email) {
        return new BaseResponse(STATUS_CODE.BAD_REQUEST, false, "Missing email");
      }
      const  OTP = CommonService.generateOTP();
      await CommonService.sendEmail(OTP, email);
      return new BaseResponse(STATUS_CODE.OK, true, "Send OTP successfully", { OTP });
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }

  async verifyOTP(OTP: string, inputOTP: string) {
    try {
      if (OTP !== inputOTP) {
        return new BaseResponse(STATUS_CODE.FORBIDDEN, false, "Invalid OTP");
      }
      return new BaseResponse(STATUS_CODE.OK, true, "Verify OTP successfully");
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
  async register(data: User) {
    try {
      if (!areAllFieldsNotNull(data)) {
        return new BaseResponse(STATUS_CODE.BAD_REQUEST, false, "Missing username, email or password");
      }
      const { username, email, password } = data;
      const existedUserName = await this.repository.getByEntity({ username });
      if (existedUserName) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, "Username existed");
      }
      const existedEmail = await this.repository.getByEntity({ email });
      if (existedEmail) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, "Email existed");
      }
      const user = await this.createUser(username, email, password);
      return user ? new BaseResponse(STATUS_CODE.OK, true, "User created successfully") : new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, "Create user account failed");
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
  async login(data: AccountInformation) {
    try {
      if (!areAllFieldsNotNull(data)) {
        return new BaseResponse(STATUS_CODE.BAD_REQUEST, false, "Missing username or password");
      }
      const { username, password } = data;
      const existedUser = await this.authenticateUser(username, password);
      if (!existedUser) {
        return new BaseResponse(STATUS_CODE.FORBIDDEN, false, "Invalid username or password");
      }
      const { id, roleID } = existedUser
      const token = await this.generateToken(id, roleID);
      return new BaseResponse(STATUS_CODE.OK, true, "login successfully", { id, roleID, token });
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
  private async createUser(username: string, email: string, password: string) {
    try {
      password = await bcrypt.hash(password, 10);
      return await this.repository.add({ username, email, password });
    } catch (err: any) {
      return null;
    }
  }
  private async authenticateUser(username: string, password: string) {
    const existedUser = await this.repository.getByEntity({ username });
    if(!existedUser) {
      return null;
    }
    const isMatched = await bcrypt.compare(password, existedUser.password);
    if(!isMatched) {
      return null;
    }
    return existedUser;
  }
  private async generateToken(id: number, role: number) {
    return await new SignJWT({ id, role })
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT"
      })
      .setIssuedAt()
      .setExpirationTime(process.env.JWT_EXPIRATION_TIME || "1h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));
  }
}

const authService = new AuthService();
export default authService;