'use client';

// React and Next
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Material UI Components
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage, CountDown, Row } from '@/app/(auth)/_components';

const SIGN_IN_PAGE = '/sign-in';

const Success = () => {
  const router = useRouter();
  const backSignInPage = () => {
    router.replace(SIGN_IN_PAGE);
  };

  return (
    <CardPage header='Thay đổi mật khẩu thành công'>
      <Typography variant='body1'>
        Bạn đã thay đổi mật khẩu thành công, vui lòng đăng nhập lại với mật khẩu mới. Trở về trang đăng nhập sau{' '}
        <CountDown initialSeconds={5} onComplete={backSignInPage} /> giây.
      </Typography>
      <Row>
        <Link href='/sign-in'>
          <Button variant='contained' size='large' sx={{ width: '100%' }}>
            Đăng nhập
          </Button>
        </Link>
      </Row>
    </CardPage>
  );
};

Success.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default Success;
