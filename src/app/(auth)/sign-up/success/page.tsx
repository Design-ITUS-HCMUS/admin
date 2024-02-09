'use client';

// React and Next
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Material UI Components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Internal
import { CardLayout, Countdown, Row } from '@/app/(auth)/_components';

const SIGN_IN_PAGE = '/sign-in';

function SuccessPage() {
  const router = useRouter();
  const backSignInPage = () => {
    router.replace(SIGN_IN_PAGE);
  };

  return (
    <CardLayout header='Đăng ký thành công'>
      <Typography variant='body1'>
        Bạn đã đăng ký tài khoản thành công, vui lòng đăng nhập với tài khoản mới. Trở về trang đăng nhập sau{' '}
        <Countdown initialSeconds={5} onComplete={backSignInPage} /> giây.
      </Typography>
      <Button size='large' component={Link} href='/sign-in'>
        Đăng nhập
      </Button>
    </CardLayout>
  );
}

export default SuccessPage;
