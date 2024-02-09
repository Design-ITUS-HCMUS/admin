'use client';

// React
import { useState } from 'react';
import Link from 'next/link';

// Material UI Components
import Button from '@mui/material/Button';
import { styled,useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// Internal
import { CardPage, CountDown, Row } from '@/app/(auth)/_components';
// Libs
import { colors } from '@/libs/ui';
import { OTPInput } from '@/libs/ui/components';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function OTPPage() {
  const theme = useTheme();
  const [otp, setOtp] = useState('');
  const [ableResend, setAbleResend] = useState(false);
  const onChange = (value: string) => setOtp(value);
  const enableResend = () => {
    setAbleResend(true);
  };

  return (
    <CardPage header='Xác thực mã OTP' showFooter mainText='Chưa có tài khoản?' linkText='Đăng ký' linkHref='/sign-up'>
      <Typography variant='body1'>
        Một mã OTP đã được gửi đến de******ub@gmail.com. Vui lòng không chia sẻ với bất kỳ ai. Nếu không nhận được
        email, bạn có thể gửi lại sau <CountDown initialSeconds={60} onComplete={enableResend} /> giây.
      </Typography>
      <OTPInput onChange={onChange} />
      <VisuallyHiddenInput type='number' readOnly value={otp} />
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
    </CardPage>
  );
}

export default OTPPage;
