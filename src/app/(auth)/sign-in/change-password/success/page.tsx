'use client';

// React and Next
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Material UI Components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Internal
import { CardPage, CountDown, Row } from '@/app/(auth)/_components';

const SIGN_IN_PAGE = '/sign-in';

function SuccessPage() {
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
}

export default SuccessPage;
