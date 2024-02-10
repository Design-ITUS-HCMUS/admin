'use client';

// Material UI Components
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

// Material UI Icons
import MailIcon from '@mui/icons-material/EmailOutlined';
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardLayout, StyledForm } from '@/app/(auth)/_components';
import { InputLayout, PasswordInput } from '@/libs/ui';

function SignUpPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* eslint-disable no-console */
    console.log('Submit sign-up-form');
  };
  return (
    <CardLayout header='Đăng ký tài khoản' showFooter page='signup'>
      <StyledForm id='sign-up-form' onSubmit={handleSubmit}>
        <InputLayout
          label='Username'
          name='username'
          inputprops={{
            placeholder: 'Username',
            endAdornment: (
              <InputAdornment position='end'>
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <InputLayout
          label='Email'
          name='email'
          inputprops={{
            placeholder: 'Email',
            endAdornment: (
              <InputAdornment position='end'>
                <MailIcon />
              </InputAdornment>
            ),
          }}
        />
        <InputLayout label='Mật khẩu' name='password'>
          <PasswordInput
            inputProps={{
              placeholder: 'Nhập mật khẩu',
            }}
          />
        </InputLayout>
        <InputLayout label='Nhập lại mật khẩu' name='password'>
          <PasswordInput
            inputProps={{
              placeholder: 'Nhập lại mật khẩu',
            }}
          />
        </InputLayout>
      </StyledForm>
      <Button size='large' form='sign-up-form'>
        Đăng ký
      </Button>
    </CardLayout>
  );
}

export default SignUpPage;
