'use client';
import { Button } from '@mui/material';
import { Row, StyledPaper, CardHeader, CardContents } from '@/app';
import AuthenLayout from '@/app/(auth)/layout';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

const Success = () => {
  const router = useRouter();

  const handleLinkClick = (pathname: string) => {
    router.replace(pathname);
  };

  return (
    <>
      <StyledPaper elevation={0} variant='section'>
        <CardHeader>Thay đổi mật khẩu thành công</CardHeader>
        <CardContents>
          Bạn đã thay đổi mật khẩu thành công, vui lòng đăng nhập lại với mật khẩu mới. Trở về trang đăng nhập sau{' '}
          <span style={{ fontWeight: '800' }}>00:05</span> giây.
        </CardContents>
        <Row>
          <Button variant='contained' size='large'>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/sign-in');
              }}>
              Đăng nhập
            </div>
          </Button>
        </Row>
      </StyledPaper>
    </>
  );
};

Success.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default Success;
