'use client';
import { Button } from '@mui/material';
import { Row, StyledPaper, CardHeader, CardContents } from '@/app';
import AuthenLayout from '@/app/(auth)/layout';
import { ReactNode } from 'react';

const Success = () => {
  return (
    <>
      <StyledPaper elevation={0} variant='section'>
        <CardHeader>Đăng ký thành công</CardHeader>
        <CardContents>
          Bạn đã đăng ký tài khoản thành công, vui lòng đăng nhập với tài khoản mới. Trở về trang đăng nhập sau{' '}
          <span style={{ fontWeight: '800' }}>00:05</span> giây.
        </CardContents>
        <Row>
          <Button href='/sign-in' variant='contained' size='large'>
            Đăng nhập
          </Button>
        </Row>
      </StyledPaper>
    </>
  );
}

Success.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default Success;