'use client';
// React
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Field, Formik } from 'formik';

// Material UI Components
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// Material UI Icons
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardLayout, Row, StyledForm, SupportTextStyle } from '@/app/(auth)/_components';
// Libs
import { InputLayout, PasswordInput } from '@/libs/ui';
import { SigninSchema } from '@/libs/validations';

function SignInPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleSubmit(values: { username: string; password: string }) {
    /* eslint-disable no-console */
    console.log('Submit sign-in-form', values);
  }

  return (
    <CardLayout
      header={
        <div>
          Câu lạc bộ học thuật thiết kế <br /> Design ITUS
        </div>
      }
      showFooter
      page='signin'>
      <Row>
        <Button
          color='info'
          size='large'
          endIcon={
            <Image
              src={isMobile ? '/google-logo.svg' : '/google-wordmark.svg'}
              width='0'
              height='24'
              style={{ width: 'auto' }}
              alt='google icon'
            />
          }>
          Đăng nhập với
        </Button>
        <Button
          color='info'
          size='large'
          endIcon={
            <Image
              src={isMobile ? '/ms-logo.svg' : '/ms-wordmark.svg'}
              width='0'
              height='24'
              style={{ width: 'auto' }}
              alt='google icon'
            />
          }>
          Đăng nhập với
        </Button>
      </Row>
      <Divider>
        <Typography variant='body2' sx={SupportTextStyle}>
          Hoặc đăng nhập với tài khoản
        </Typography>
      </Divider>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={SigninSchema}>
        {({ touched, errors }) => (
          <StyledForm id='sign-in-form'>
            <InputLayout
              label='Nhập username hoặc email'
              inputProps={{
                name: 'username',
                placeholder: 'Username hoặc email',
                endAdornment: (
                  <InputAdornment position='end'>
                    <PersonIcon />
                  </InputAdornment>
                ),
                error: Boolean(touched.username && errors.username),
              }}
              helperText={touched.username ? errors.username : undefined}
              formik
            />
            <InputLayout label='Mật khẩu' helperText={touched.password ? errors.password : undefined}>
              <Field
                as={PasswordInput}
                placeholder='Nhập mật khẩu'
                name='password'
                error={Boolean(touched.username && errors.username)}
              />
            </InputLayout>
            <div style={{ textAlign: 'right' }}>
              <Typography variant='linkAccent' component={Link} href='/sign-in/forget-password'>
                Quên mật khẩu
              </Typography>
            </div>
          </StyledForm>
        )}
      </Formik>
      <Button size='large' type='submit' form='sign-in-form'>
        Đăng nhập
      </Button>
    </CardLayout>
  );
}

export default SignInPage;
