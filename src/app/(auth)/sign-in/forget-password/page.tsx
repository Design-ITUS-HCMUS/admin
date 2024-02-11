'use client';

// React
import { useRouter } from 'next/navigation';

// Material UI Components
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

// Material UI Icons
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardLayout, StyledForm } from '@/app/(auth)/_components';
// Libs
import { InputLayout } from '@/libs/ui/components';

function ForgetPasswordPage() {
  const router = useRouter();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push('/sign-in/forget-password/otp');
    /* eslint-disable no-console */
    console.log('Submit forget-password-form');
  }

  return (
    <CardLayout header='Quên mật khẩu' showFooter page='signin'>
      <StyledForm id='forget-password-form' onSubmit={handleSubmit}>
        <InputLayout
          label='Username'
          inputProps={{
            name: 'username',
            placeholder: 'Username hoặc email đã đăng ký',
            endAdornment: (
              <InputAdornment position='end'>
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
      </StyledForm>
      <Button size='large' type='submit' form='forget-password-form'>
        Gửi mã
      </Button>
    </CardLayout>
  );
}

export default ForgetPasswordPage;
