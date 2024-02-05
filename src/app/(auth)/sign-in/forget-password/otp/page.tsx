'use client';

// React
import { ReactNode, useState } from 'react';
import Link from 'next/link';

// Libs
import { OTPInput } from '@/libs/ui/components';
import { colors } from '@/libs/ui';

// Material UI Components
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage, CountDown, Row, SupportTextStyle } from '@/app/(auth)/_components';

const OTP = () => {
  const theme = useTheme();
  const [otp, setOtp] = useState('');
  const [ableResend, setAbleResend] = useState(false);
  const onChange = (value: string) => setOtp(value);
  const enableResend = () => {
    setAbleResend(true);
  };

  return (
    <CardPage header='Xác thực mã OTP'>
      <Typography variant='body1'>
        Một mã OTP đã được gửi đến de******ub@gmail.com. Vui lòng không chia sẻ với bất kỳ ai. Nếu không nhận được
        email, bạn có thể gửi lại sau <CountDown initialSeconds={60} onComplete={enableResend} /> giây.
      </Typography>
      <OTPInput onChange={onChange} />
      <Row>
        <Button
          disabled={!ableResend}
          variant={ableResend ? 'text' : undefined}
          sx={{ color: ableResend ? theme.palette.primary.main : colors.neutral[300] }}>
          Gửi lại mã
        </Button>
        <Link href='/sign-in/change-password'>
          <Button variant='contained' size='large' sx={{ width: '100%' }}>
            Xác nhận
          </Button>
        </Link>
      </Row>
      <Row style={{ alignItems: 'baseline', gap: 8 }}>
        <Typography
          sx={{
            ...SupportTextStyle,
            textAlign: 'right',
            display: 'inline-block',
            width: 'fit-content',
            fontWeight: '600',
          }}>
          Chưa có tài khoản?
        </Typography>
        <Typography
          component={Link}
          href='/sign-up'
          variant='linkPrimary'
          sx={{ display: 'inline-block', width: 'fit-content' }}>
          Đăng ký
        </Typography>
      </Row>
    </CardPage>
  );
};

OTP.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default OTP;
