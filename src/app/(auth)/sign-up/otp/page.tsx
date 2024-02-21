'use client';
// React
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Material UI Components
import Alert from '@mui/material/Alert';
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
  const [key, setKey] = useState(0);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const { signUp, setSignUp } = useAuthContext();

  const onChange = (value: string) => setOTP(value);
  const enableResend = () => {
    setAbleResend(true);
  };

  useEffect(() => {
    if (!signUp.isSigningUp) {
      router.replace('/sign-up');
    } else {
      setIsLoadingPage(false);
      setSignUp({ ...signUp, isSigningUp: false });
    }
  }, []);

  async function handleResend() {
    try {
      setIsLoadingResend(true);

      const response = await fetch('/api/auth/otpRegistration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: signUp.email, username: signUp.username }),
      });

      if (!response.ok) {
        if (response.status === 500) {
          setAlertMessage('Có lỗi xảy ra, vui lòng thử lại');
          throw new Error('Error message');
        }
      }

      setAbleResend(false);
      setKey((key + 1) % 2); // force re-render

      setIsLoadingResend(false);
    } catch (error: any) {
      console.error('Error:', error.message);
      setIsLoadingResend(false);
    }
  }

  async function handleSubmit() {
    try {
      setIsLoadingSubmit(true);

      const response = await fetch('/api/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: signUp.username, email: signUp.email, password: signUp.password, OTP }),
      });

      switch (response.status) {
        case 200:
          setSignUp({ ...signUp, isSigningUp: true });
          router.replace('/sign-up/success');
          break;
        case 403:
          setAlertMessage('Mã OTP không hợp lệ');
          throw new Error('Invalid OTP');
        default:
          setAlertMessage('Có lỗi xảy ra, vui lòng thử lại');
          throw new Error('Error message');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      setIsLoadingSubmit(false);
    }
  }

  return isLoadingPage ? (
    <CircularProgress sx={{ color: 'primary.main', alignSelf: 'center' }} />
  ) : (
    <CardLayout header='Xác thực mã OTP' showFooter page='signup'>
      {alertMessage !== '' && (
        <Alert
          icon={false}
          severity='error'
          onClose={() => {
            setAlertMessage('');
          }}>
          {alertMessage}
        </Alert>
      )}
      <Typography variant='body1'>
        Một mã OTP đã được gửi đến {hiddenEmail(`${signUp.email}`)}. Vui lòng không chia sẻ với bất kỳ ai. Nếu không
        nhận được email, bạn có thể gửi lại sau <Countdown key={key} initialSeconds={60} onComplete={enableResend} />{' '}
        giây.
      </Typography>
      <OTPInput key={key} onChange={onChange} />
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
