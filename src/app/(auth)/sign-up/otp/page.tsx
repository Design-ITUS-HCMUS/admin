'use client';
// React
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Material UI Components
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// Internal
import { CardLayout, Countdown, Row } from '@/app/(auth)/_components';
import { useAuthContext } from '@/app/(auth)/_context/store';

// Libs
import { colors, OTPInput } from '@/libs/ui';
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
  const router = useRouter();
  const [OTP, setOTP] = useState('');
  const [ableResend, setAbleResend] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const { signUp } = useAuthContext();

  const onChange = (value: string) => setOTP(value);
  const enableResend = () => {
    setAbleResend(true);
  };

  const handleResend = () => {
    setIsLoadingResend(true);
    fetch('/api/auth/otpRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: signUp.email, username: signUp.username }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAbleResend(false);
          setCountdownKey((countdownKey + 1) % 2); // force re-render
        }
        setIsLoadingResend(false);
      });
  };

  const handleSubmit = () => {
    setIsLoadingSubmit(true);

    fetch('/api/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: signUp.username, email: signUp.email, password: signUp.password, OTP }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.push('/sign-up/success');
        } else {
          setIsLoadingSubmit(false);
        }
      });
  };

  return (
    <CardLayout header='Xác thực mã OTP' showFooter page='signup'>
      <Typography variant='body1'>
        Một mã OTP đã được gửi đến {hiddenEmail(`${signUp.email}`)}. Vui lòng không chia sẻ với bất kỳ ai. Nếu không
        nhận được email, bạn có thể gửi lại sau{' '}
        <Countdown key={countdownKey} initialSeconds={60} onComplete={enableResend} /> giây.
      </Typography>
      <OTPInput onChange={onChange} />
      <VisuallyHiddenInput type='number' readOnly value={OTP} name='otp' />
      <Row>
        <Button disabled={!ableResend} variant='text' onClick={handleResend} sx={{ padding: 0 }}>
          {isLoadingResend ? (
            <CircularProgress sx={{ color: 'primary.main', padding: '5px' }} />
          ) : (
            <div>Gửi lại mã</div>
          )}
        </Button>
        <Button size='large' onClick={handleSubmit}>
          {isLoadingSubmit ? (
            <CircularProgress sx={{ color: colors.neutral.white, padding: '5px' }} />
          ) : (
            <div>Xác nhận</div>
          )}
        </Button>
      </Row>
    </CardLayout>
  );
}

export default OTPPage;
