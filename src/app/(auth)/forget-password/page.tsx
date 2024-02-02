'use client';
import { TextFieldWithLabel as TextField } from '@/libs/ui/components';
import { Button, InputAdornment } from '@mui/material';
import { PersonRounded as PersonIcon } from '@mui/icons-material';
import { Row, StyledPaper, StyledForm, CardHeader, CardFooter } from '@/app';
import AuthenLayout from '@/app/(auth)/layout';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

const ForgetPassword = () => {
  const router = useRouter();

  const handleLinkClick = (pathname: string) => {
    router.replace(pathname);
  };

  return (
    <>
      <StyledPaper elevation={0}>
        <CardHeader>Quên mật khẩu</CardHeader>
        <StyledForm>
          <TextField
            label='Username'
            inputProps={{
              placeholder: 'Username hoặc email đã đăng ký',
              endAdornment: (
                <InputAdornment position='end'>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}></TextField>
        </StyledForm>
        <Row>
          <Button variant='contained' size='large'>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/sign-in/otp');
              }}>
              Gửi mã
            </div>
          </Button>
        </Row>
        <CardFooter mainText='Chưa có tài khoản?' linkText='Đăng ký' linkHref='/sign-up' />
      </StyledPaper>
    </>
  );
};

ForgetPassword.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default ForgetPassword;
