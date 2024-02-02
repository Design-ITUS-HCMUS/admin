'use client';
import { TextFieldWithLabel as TextField, PasswordFieldWithLabel as PassField } from '@/libs/ui/components';
import { Button, InputAdornment } from '@mui/material';
import {
  PersonRounded as PersonIcon,
  EmailOutlined as MailIcon,
} from '@mui/icons-material';
import { Row, StyledPaper, StyledForm, CardHeader, CardFooter } from '@/app';
import AuthenLayout from '@/app/(auth)/layout';
import { ReactNode } from 'react';

const SignUp = () => {
  return (
    <>
      <StyledPaper elevation={0}>
        <CardHeader>Đăng ký tài khoản</CardHeader>
        <StyledForm>
          <TextField
            label='Username'
            inputProps={{
              placeholder: 'Username',
              endAdornment: (
                <InputAdornment position='end'>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}></TextField>
          <TextField
            label='Email'
            inputProps={{
              placeholder: 'Email',
              endAdornment: (
                <InputAdornment position='end'>
                  <MailIcon />
                </InputAdornment>
              ),
            }}></TextField>
          <PassField
            label='Mật khẩu'
            inputProps={{
              placeholder: 'Nhập mật khẩu',
            }}
          />
          <PassField
            label='Nhập lại mật khẩu'
            inputProps={{
              placeholder: 'Nhập lại mật khẩu',
            }}
          />
        </StyledForm>
        <Row>
          <Button variant='contained' size='large'>
            Đăng ký
          </Button>
        </Row>
        <CardFooter mainText='Đã có tài khoản?' linkText='Đăng nhập' linkHref='/sign-in' />
      </StyledPaper>
    </>
  );
};

SignUp.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default SignUp;
