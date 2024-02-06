export interface User {
  username: string;
  email: string;
  password: string;
  OTP: string;
  profile?: object;
}
export interface AccountInformation {
  usernameOrEmail: string;
  password: string;
}
export interface SendOTP {
  email: string;
  type: number;
}
export interface ResetPassword {
  usernameOrEmail: string;
  newPassword: string;
}