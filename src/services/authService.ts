import { SignJWT } from 'jose';
import bcrypt from 'bcryptjs';
import CommonService from '@/services/commonService';
import UserRepository from '@repositories/userRepository';
import { AccountInformation, User, SendOTP, ResetPassword } from '@/interfaces/user';
import BaseResponse from '@/utils/baseResponse';
import { STATUS_CODE, TYPE_OTP, areAllFieldsNotNull, templateSendOTP, templateResetPassword } from '@/utils';

class AuthService {
  private repository: UserRepository;
  private readonly saltRounds: number;
  constructor() {
    this.repository = new UserRepository();
    this.saltRounds = Number(process.env.HASH_SALT_ROUNDS);
  }
  async sendOtpToRegister(email: string, username: string) {
    try {
      const { existedUserName, existedEmail } = await this.checkExistedUser(username, email);
      if (existedUserName) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, "Username existed");
      }
      if (existedEmail) {
        return new BaseResponse(STATUS_CODE.CONFLICT, false, "Email existed");
      }
      const OTP = await this.sendOTP({ email, type: TYPE_OTP.REGISTER });
      return new BaseResponse(STATUS_CODE.OK, true, "Send OTP successfully", { OTP });
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
  async sendOtpToResetPassword(usernameOrEmail: string) {
    try {
      const queryField = this.getQueryField(usernameOrEmail);
      const user = await this.repository.getByEntity(queryField);
      if (!user) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, "Account not found");
      }
      const OTP = await this.sendOTP({ email: user.email, type: TYPE_OTP.RESET_PASSWORD });
      return new BaseResponse(STATUS_CODE.OK, true, "Send OTP successfully", { OTP });
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
  async verifyOTP(inputOTP: string, OTP: string) {
    try {
      const isMatched = await bcrypt.compare(inputOTP, OTP);
      return isMatched ? new BaseResponse(STATUS_CODE.OK, true, "Verify OTP successfully") : new BaseResponse(STATUS_CODE.FORBIDDEN, false, "Invalid OTP");
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
  async register(data: User, OTP: string) {
    try {
      const isMatched = await bcrypt.compare(data.OTP, OTP);
      if (!isMatched) {
        return new BaseResponse(STATUS_CODE.FORBIDDEN, false, "Invalid OTP");
      }
      if (!areAllFieldsNotNull(data)) {
        return new BaseResponse(STATUS_CODE.BAD_REQUEST, false, "Missing username, email or password");
      }
      const { username, email, password } = data;
      const user = await this.createUser(username, email, password, data.profile);
      return user ? new BaseResponse(STATUS_CODE.OK, true, "User created successfully") : new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, "Create user account failed");
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
  async login(data: AccountInformation) {
    try {
      if (!areAllFieldsNotNull(data)) {
        return new BaseResponse(STATUS_CODE.BAD_REQUEST, false, "Missing username (email) or password");
      }
      const existedUser = await this.authenticateUser(data.usernameOrEmail, data.password);
      if (!existedUser) {
        return new BaseResponse(STATUS_CODE.FORBIDDEN, false, "Invalid username (email) or password");
      }
      const { id, roleID } = existedUser
      const token = await this.generateToken(id, roleID);
      return new BaseResponse(STATUS_CODE.OK, true, "login successfully", { id, roleID, token });
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
  async resetPassword(data: AccountInformation) {
    try {
      const queryField = this.getQueryField(data.usernameOrEmail);
      const existedUser = await this.repository.getByEntity(queryField);
      if (!existedUser) {
        return new BaseResponse(STATUS_CODE.NOT_FOUND, false, "Account not found");
      }
      const isMatched = await bcrypt.compare(data.password, existedUser.password);
      if (isMatched) {
        return new BaseResponse(STATUS_CODE.FORBIDDEN, false, "New password must be different from old password");
      }
      const newPassword = await bcrypt.hash(data.password, this.saltRounds);
      const updatePwd = await this.repository.update({ password: newPassword, id: existedUser.id });
      return updatePwd ? new BaseResponse(STATUS_CODE.OK, true, "update password successfully") : new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, "fail to update password")
    } catch (err: any) {
      return new BaseResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, false, err.message);
    }
  }
  private async sendOTP(data: SendOTP) {
    try {
      const templateType = data.type === TYPE_OTP.REGISTER ? templateSendOTP : templateResetPassword;
      const OTP = CommonService.generateOTP();
      const html= CommonService.replacePlaceholder(templateType.html, { OTP });
      const text= CommonService.replacePlaceholder(templateType.text, { OTP });
      await CommonService.sendEmail({ to: data.email, text, subject: templateType.subject, html });
      return await bcrypt.hash(OTP, this.saltRounds);
    } catch (err: any) {
      return null;
    }
  }
  private async createUser(username: string, email: string, password: string, profile?: Object) {
    try {
      password = await bcrypt.hash(password, this.saltRounds);
      return await this.repository.add({ username, email, password, profile });
    } catch (err: any) {
      return null;
    }
  }
  private async authenticateUser(usernameOrEmail: string, password: string) {
    const queryField = this.getQueryField(usernameOrEmail);
    const existedUser = await this.repository.getByEntity(queryField);
    if(!existedUser) {
      return null;
    }
    const isMatched = await bcrypt.compare(password, existedUser.password);
    if(!isMatched) {
      return null;
    }
    return existedUser;
  }
  private async checkExistedUser(username: string, email: string) {
    const existedUserName = await this.repository.getByEntity({ username });
    const existedEmail = await this.repository.getByEntity({ email });
    return { existedUserName, existedEmail };
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
  private getQueryField(usernameOrEmail: string) {
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return usernameOrEmail.match(validEmailRegex) ? { email: usernameOrEmail } : { username: usernameOrEmail };
  }
}

const authService = new AuthService();
export default authService;