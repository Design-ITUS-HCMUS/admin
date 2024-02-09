'use client';
// React
import { useState } from 'react';
import Link from 'next/link';

// Material UI Components
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// Internal
import { CardLayout, Countdown, Row } from '@/app/(auth)/_components';
// Libs
import { OTPInput } from '@/libs/ui';
import { hiddenEmail } from '@/utils';

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
  const [otp, setOtp] = useState('');
  const [ableResend, setAbleResend] = useState(false);
  const onChange = (value: string) => setOtp(value);
  const enableResend = () => {
    setAbleResend(true);
  };

  return (
    <CardLayout header='Xác thực mã OTP' showFooter page='signup'>
      <Typography variant='body1'>
        Một mã OTP đã được gửi đến {hiddenEmail('ngantruc2003@gmail.com')}. Vui lòng không chia sẻ với bất kỳ ai. Nếu
        không nhận được email, bạn có thể gửi lại sau <Countdown initialSeconds={60} onComplete={enableResend} /> giây.
      </Typography>
      <OTPInput onChange={onChange} />
      <VisuallyHiddenInput type='number' readOnly value={otp} />
      <Row>
        <Button disabled={!ableResend} variant='text'>
          Gửi lại mã
        </Button>
        <Button size='large' component={Link} href='/sign-up/success'>
          Xác nhận
        </Button>
      </Row>
    </CardLayout>
  );
}

export default OTPPage;
