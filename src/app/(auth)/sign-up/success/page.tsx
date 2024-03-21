'use client';

// React and Next
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Material UI Components
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

// Internal
import { CardLayout, Countdown } from '@/app/(auth)/_components';
import { useAuthContext } from '@/app/(auth)/_context/store';
// Libs
import { colors } from '@/libs/ui';

const SIGN_IN_PAGE = '/sign-in';

function SuccessPage() {
  const router = useRouter();
  const { signUp, setSignUp } = useAuthContext();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const backSignInPage = () => {
    router.replace(SIGN_IN_PAGE);
  };

  const handleOnClick = () => {
    setIsLoadingSubmit(true);
  };

  useEffect(() => {
    if (!signUp.isSigningUp) {
      router.replace('/sign-up');
    } else {
      setIsLoadingPage(false);
      setSignUp({ ...signUp, isSigningUp: false });
    }
  }, []);

  return isLoadingPage ? (
    <CircularProgress sx={{ color: 'primary.main', alignSelf: 'center' }} />
  ) : (
    <CardLayout header='Đăng ký thành công'>
      <Typography variant='body1'>
        Bạn đã đăng ký tài khoản thành công, vui lòng đăng nhập với tài khoản mới. Trở về trang đăng nhập sau{' '}
        <Countdown initialSeconds={5} onComplete={backSignInPage} /> giây.
      </Typography>
      <Button size='large' component={Link} href='/sign-in' onClick={handleOnClick}>
        {isLoadingSubmit ? (
          <CircularProgress sx={{ color: colors.neutral.white, padding: '5px' }} />
        ) : (
          <div>Đăng nhập</div>
        )}
      </Button>
    </CardLayout>
  );
}

export default SuccessPage;
