'use client';

// React
import { ReactNode } from 'react';
import Link from 'next/link';

// Libs
import { TextFieldWithLabel as TextField } from '@/libs/ui/components';

// Material UI Components
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

// Material UI Icons
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import AuthenLayout from '@/app/(auth)/layout';
import { CardPage, Row, StyledForm, SupportTextStyle } from '@/app/(auth)/_components';

const ForgetPassword = () => {
  return (
    <CardPage header='Quên mật khẩu'>
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
        <Link href='/sign-in/forget-password/otp'>
          <Button variant='contained' size='large' sx={{ width: '100%' }}>
            Gửi mã
          </Button>
        </Link>
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

ForgetPassword.getLayout = (page: ReactNode) => {
  return <AuthenLayout>{page}</AuthenLayout>;
};

export default ForgetPassword;
