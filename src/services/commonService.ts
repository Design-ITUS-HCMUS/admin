import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import { IBaseResponseBody } from '@/interfaces/baseResponse';
import { sendEmail } from '@/interfaces/common';
class CommonService {
  public async sendEmail(data: sendEmail) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.MAILER_ADDRESS,
          pass: process.env.MAILER_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.MAILER_ADDRESS,
        to: data.to,
        subject: data.subject,
        text: data?.text,
        html: data.html,
      };
      await transporter.sendMail(mailOptions);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public generateOTP(length: number = 6) {
    return otpGenerator.generate(length, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
  }
  public getDataToSaveInCookie(data: IBaseResponseBody, key: string) {
    const value = data.data[key];
    delete data.data[key];
    return { value, body: data };
  }
  public replacePlaceholder(content: string, data: Record<string, string>) {
    let result = content;
    Object.keys(data).forEach((key) => {
      result = result.replace(new RegExp(`{${key}}`, 'g'), data[key]);
    });
    return result;
  }
}

const commonService = new CommonService();
export default commonService;