'use client';

// Libs
import { PasswordFieldWithLabel as PassField, TextFieldWithLabel as TextField } from '@/libs/ui/components';

// Material UI Components
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

// Material UI Icons
import MailIcon from '@mui/icons-material/EmailOutlined';
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardPage, StyledForm, Row } from '@/app/(auth)/_components';

function SignUpPage() {
  return (
    <CardPage
      header='Đăng ký tài khoản'
      showFooter
      mainText='Đã có tài khoản?'
      linkText='Đăng nhập'
      linkHref='/sign-in'>
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
    </CardPage>
  );
}

export default SignUpPage;
