'use client';
import React, { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { FullscreenImage as Background, Logo, TextFieldWithLabel as TextField } from '@/libs/ui/components';
import { Button, Typography, Paper, TypographyProps, InputAdornment, Divider } from '@mui/material';
import { PersonRounded as PersonIcon, RemoveRedEyeRounded as ShowIcon } from '@mui/icons-material';
import color from '@/libs/ui/color';

const HeaderStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '.5rem',
};

const SupportTextStyle: CSSProperties = {
  color: color.neutral[200],
};

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '1rem',
  '& > *': {
    width: '100%',
  },
});

const StyledPaper = styled(Paper)({
  position: 'absolute',
  width: '500px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '& > *': {
    width: '100%',
  },
});

const StyledForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
});

type Props = {
  children?: React.ReactNode;
  typographyProps?: TypographyProps;
};

const CardHeader = ({ children, typographyProps }: Props) => {
  return (
    <div style={HeaderStyle}>
      <Logo size='large' />
      <Typography
        {...typographyProps}
        variant='h5'
        sx={{
          fontWeight: '700',
          color: 'primary.darker',
          textAlign: 'center',
        }}>
        {children}
      </Typography>
    </div>
  );
};

export default function SignIn() {
  return (
    <>
      <Background src='/thumbnail.jpg' alt='Picture of Design ITUS' />
      <StyledPaper elevation={0}>
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
              <Image src='/google-wordmark.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
            }>
            Đăng nhập với
          </Button>
          <Button
            color='info'
            variant='contained'
            size='large'
            style={{ width: '100%' }}
            endIcon={
              <Image src='/ms-wordmark.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
            }>
            Đăng nhập với
          </Button>
        </Row>
        <Row>
          <Divider>
            <Typography variant='body2' style={SupportTextStyle}>
              Hoặc đăng nhập với
            </Typography>
          </Divider>
        </Row>
        <StyledForm>
          <TextField
            label='Username'
            inputProps={{
              placeholder: 'Nhập username hoặc email',
              endAdornment: (
                <InputAdornment position='end'>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}></TextField>
          <TextField
            label='Password'
            inputProps={{
              placeholder: 'Nhập password',
              endAdornment: (
                <InputAdornment position='end'>
                  <ShowIcon />
                </InputAdornment>
              ),
            }}></TextField>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Link href='/sign-up'>
              <Typography variant='linkAccent'>Quên mật khẩu</Typography>
            </Link>
          </div>
        </StyledForm>
        <Row>
          <Button variant='contained' size='large'>
            Đăng nhập
          </Button>
        </Row>
        <Row style={{ alignItems: 'baseline', gap: 2 }}>
          <Typography variant='body2' style={{ textAlign: 'right', ...SupportTextStyle }}>
            Chưa có tài khoản?
          </Typography>
          <Link href='/sign-up'>
            <Typography variant='linkPrimary'>Đăng ký</Typography>
          </Link>
        </Row>
      </StyledPaper>
    </>
  );
}
