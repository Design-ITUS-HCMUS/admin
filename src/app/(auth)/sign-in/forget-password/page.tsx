'use client';

// React
import Link from 'next/link';

// Libs
import { TextFieldWithLabel as TextField } from '@/libs/ui/components';

// Material UI Components
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

// Material UI Icons
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardPage, Row, StyledForm } from '@/app/(auth)/_components';

function ForgetPasswordPage() {
  return (
    <CardPage header='Quên mật khẩu' showFooter mainText='Chưa có tài khoản?' linkText='Đăng ký' linkHref='/sign-up'>
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
    </CardPage>
  );
}

export default ForgetPasswordPage;
