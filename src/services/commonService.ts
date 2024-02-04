import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
class CommonService {
  public async sendEmail(content: string, email: string) {
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
        to: email,
        subject: 'OTP',
        text: `This is otp code`,
        html: `<b>${content}</b>`,
      };
      await transporter.sendMail(mailOptions);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public generateOTP(length: number = 6) {
    return otpGenerator.generate(length, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
  }
}

const commonService = new CommonService();
export default commonService;