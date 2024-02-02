'use client';
import { useState, ReactNode } from 'react';
import OtpInput from '@/app/components/OTPInput';
import { Button, Typography, Alert } from '@mui/material';
import { Row, StyledPaper, CardHeader, CardContents, CardFooter } from '@/app';
import { colors } from '@/libs/ui';
import AuthenLayout from '@/app/(auth)/layout';

const OTPResend = () => {
  const [otp, setOtp] = useState('');
  const onChange = (value: string) => setOtp(value);

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
            Gửi lại mã
          </Button>
          <Button variant='contained' size='large'>
            Xác nhận
          </Button>
        </Row>
        <CardFooter mainText='Đã có tài khoản?' linkText='Đăng nhập' linkHref='/sign-in'/>
      </StyledPaper>
    </>
  );
}

OTPResend.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default OTPResend;