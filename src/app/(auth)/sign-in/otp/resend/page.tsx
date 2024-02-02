'use client';
import { useState, ReactNode } from 'react';
import OtpInput from '@/app/components/OTPInput';
import { Button, Typography, Alert } from '@mui/material';
import { Row, StyledPaper, CardHeader, CardContents, CardFooter } from '@/app';
import { colors } from '@/libs/ui';
import AuthenLayout from '@/app/(auth)/layout';
import { useRouter } from 'next/navigation';

const OTPResend = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const onChange = (value: string) => setOtp(value);

  const handleLinkClick = (pathname: string) => {
    router.replace(pathname);
  };

  return (
    <>
      <StyledPaper elevation={0}>
        <CardHeader>Xác thực mã OTP</CardHeader>
        <Alert icon={false} severity='error' onClose={() => {}}>
          <Typography variant='body2' style={{ fontWeight: '400', lineHeight: '20.02px', letterSpacing: '0.17px' }}>
            Mã OTP không hợp lệ, vui lòng thử lại
          </Typography>
        </Alert>
        <CardContents>
          Một mã OTP đã được gửi đến de******ub@gmail.com. Vui lòng không chia sẻ với bất kỳ ai. Nếu không nhận được
          email, bạn có thể gửi lại sau <span style={{ fontWeight: '800' }}>00:00</span> giây.
        </CardContents>
        <OtpInput onChange={onChange} />
        <Row>
          <Button variant='text' style={{ color: colors.blue[500] }}>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/sign-in/otp/resend');
              }}>
              Gửi lại mã
            </div>
          </Button>
          <Button variant='contained' size='large'>
            <div
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/change-password');
                }}>
                Xác nhận
            </div>
          </Button>
        </Row>
        <CardFooter mainText='Chưa có tài khoản?' linkText='Đăng ký' linkHref='/sign-up'/>
      </StyledPaper>
    </>
  );
}

OTPResend.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default OTPResend;