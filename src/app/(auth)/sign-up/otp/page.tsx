'use client';

// React
import { useState } from 'react';
import Link from 'next/link';

// Libs
import { colors } from '@/libs/ui';
import { OTPInput } from '@/libs/ui/components';

// Material UI Components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// Internal
import { CardPage, CountDown, Row } from '@/app/(auth)/_components';

function OTPPage() {
  const theme = useTheme();
  const [otp, setOtp] = useState('');
  const [ableResend, setAbleResend] = useState(false);
  const onChange = (value: string) => setOtp(value);
  const enableResend = () => {
    setAbleResend(true);
  };

  return (
    <CardPage header='Xác thực mã OTP' showFooter mainText='Đã có tài khoản?' linkText='Đăng nhập' linkHref='/sign-in'>
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
        <Link href='/sign-up/success'>
          <Button variant='contained' size='large' sx={{ width: '100%' }}>
            Xác nhận
          </Button>
        </Link>
      </Row>
    </CardPage>
  );
}

export default OTPPage;
