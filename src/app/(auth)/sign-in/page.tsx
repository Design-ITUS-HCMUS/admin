'use client';

// React
import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Libs
import { PasswordFieldWithLabel as PassField, TextFieldWithLabel as TextField } from '@/libs/ui/components';

// Material UI Components
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// Material UI Icons
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage, Row, StyledForm, SupportTextStyle } from '@/app/(auth)/_components';

const SignIn = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <CardPage header='Câu lạc bộ học thuật thiết kế <br /> Design ITUS'>
      <Row>
        <Button
          color='info'
          variant='contained'
          size='large'
          sx={{ width: '100%' }}
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
          sx={{ width: '100%' }}
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
          <Typography variant='body2' sx={SupportTextStyle}>
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
          <Link href='/sign-in/forget-password' style={{ display: 'inline-block', width: 'fit-content' }}>
            <Typography variant='linkAccent'>Quên mật khẩu</Typography>
          </Link>
        </div>
      </StyledForm>
      <Row>
        <Button variant='contained' size='large'>
          Đăng nhập
        </Button>
      </Row>
      <Row style={{ alignItems: 'baseline', gap: 8 }}>
        <Typography
          sx={{
            ...SupportTextStyle,
            textAlign: 'right',
            display: 'inline-block',
            width: 'fit-content',
            fontWeight: '600',
          }}>
          Chưa có tài khoản?
        </Typography>
        <Typography
          component={Link}
          href='/sign-up'
          variant='linkPrimary'
          sx={{ display: 'inline-block', width: 'fit-content' }}>
          Đăng ký
        </Typography>
      </Row>
    </CardPage>
  );
};

SignIn.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default SignIn;