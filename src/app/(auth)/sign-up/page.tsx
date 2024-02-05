'use client';

// React
import { ReactNode } from 'react';
import Link from 'next/link';

// Libs
import { PasswordFieldWithLabel as PassField, TextFieldWithLabel as TextField } from '@/libs/ui/components';

// Material UI Components
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

// Material UI Icons
import MailIcon from '@mui/icons-material/EmailOutlined';
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage, StyledForm, SupportTextStyle, Row } from '@/app/(auth)/_components';

const SignUp = () => {
  return (
    <CardPage header='Đăng ký tài khoản'>
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
          label='Nhập lại mật khẩu mới'
          inputProps={{
            placeholder: 'Nhập lại mật khẩu mới',
          }}
        />
      </StyledForm>
      <Row>
        <Button variant='contained' size='large'>
          Đăng ký
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
          Đã có tài khoản?
        </Typography>
        <Typography
          component={Link}
          href='/sign-in'
          variant='linkPrimary'
          sx={{ display: 'inline-block', width: 'fit-content' }}>
          Đăng nhập
        </Typography>
      </Row>
    </CardPage>
  );
};

SignUp.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default SignUp;