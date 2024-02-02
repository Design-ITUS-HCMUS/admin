'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TextFieldWithLabel as TextField, PasswordFieldWithLabel as PassField } from '@/libs/ui/components';
import { Button, Typography, InputAdornment, Divider, useMediaQuery } from '@mui/material';
import { PersonRounded as PersonIcon } from '@mui/icons-material';
import { SupportTextStyle, Row, StyledPaper, StyledForm, CardHeader, constants, CardFooter } from '@/app';
import AuthenLayout from '@/app/(auth)/layout';
import { ReactNode } from 'react';

const SignIn = () => {
  const isSmallScreen = useMediaQuery(`(max-width: ${constants.PAPER_MAX_WIDTH})`);

  return (
    <>
      <StyledPaper elevation={0} variant='section'>
        <CardHeader>
          Câu lạc bộ học thuật thiết kế <br />
          Design ITUS
        </CardHeader>
        <Row>
          <Button
            color='info'
            variant='contained'
            size='large'
            style={{ width: '100%' }}
            endIcon={
              isSmallScreen ? (
                <Image src='/google-logo.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
              ) : (
                <Image src='/google-wordmark.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
              )
            }>
            Đăng nhập với
          </Button>
          <Button
            color='info'
            variant='contained'
            size='large'
            style={{ width: '100%' }}
            endIcon={
              isSmallScreen ? (
                <Image src='/ms-logo.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
              ) : (
                <Image src='/ms-wordmark.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
              )
            }>
            Đăng nhập với
          </Button>
        </Row>
        <Row>
          <Divider>
            <Typography variant='body2' style={SupportTextStyle}>
              Hoặc đăng nhập với tài khoản
            </Typography>
          </Divider>
        </Row>
        <StyledForm>
          <TextField
            label='Nhập tên đội'
            inputProps={{
              placeholder: 'Username hoặc email',
              endAdornment: (
                <InputAdornment position='end'>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}></TextField>
          <PassField
            label='Mật khẩu'
            inputProps={{
              placeholder: 'Nhập mật khẩu',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Link href='/forget-password' style={{ display: 'inline-block', width: 'fit-content'}}>
              <Typography variant='linkAccent'>Quên mật khẩu</Typography>
            </Link>
          </div>
        </StyledForm>
        <Row>
          <Button variant='contained' size='large'>
            Đăng nhập
          </Button>
        </Row>
        <CardFooter mainText='Chưa có tài khoản?' linkText='Đăng ký' linkHref='/sign-up' />
      </StyledPaper>
    </>
  );
};

SignIn.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default SignIn;
