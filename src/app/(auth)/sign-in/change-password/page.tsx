'use client';

// React
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Field, Formik } from 'formik';

// Material UI Components
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

// Internal
import { CardLayout, Countdown, StyledForm } from '@/app/(auth)/_components';
import { useAuthContext } from '@/app/(auth)/_context/store';

// Libs
import { colors, InputLayout, PasswordInput } from '@/libs/ui';
import { ForgetPasswordSchema } from '@/libs/validations';

function ChangePasswordPage() {
  const router = useRouter();
  const { signIn, setSignIn } = useAuthContext();
  const [success, setSuccess] = useState(false);
  const [isLoadingToSignIn, setIsLoadingToSignIn] = useState(false);
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const usernameOrEmail = signIn.username;

  const backSignInPage = () => {
    router.replace('/sign-in');
  };

  const handleOnClick = () => {
    setIsLoadingToSignIn(true);
  };

  async function handleSubmit(values: { password: string; repassword: string }) {
    try {
      setIsLoadingChange(true);

      const response = await fetch('/api/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernameOrEmail,
          password: values.password,
        }),
      });

      switch (response.status) {
        case 200:
          setSuccess(true);
          break;
        case 403:
          setAlertMessage('Mật khẩu mới phải khác mật khẩu cũ');
          throw new Error(`New password must be different from old password`);
        default:
          setAlertMessage('Thay đổi mật khẩu thất bại');
          throw new Error(`Change password failed`);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      setIsLoadingChange(false);
    }
  }

  useEffect(() => {
    if (!signIn.isForgettingPassword) {
      router.replace('/sign-in/forget-password');
    } else {
      setIsLoadingPage(false);
      setSignIn({ ...signIn, isForgettingPassword: false });
    }
  }, []);

  return success ? (
    <CardLayout header='Thay đổi mật khẩu thành công'>
      <Typography variant='body1'>
        Bạn đã thay đổi mật khẩu thành công, vui lòng đăng nhập lại với mật khẩu mới. Trở về trang đăng nhập sau{' '}
        <Countdown initialSeconds={5} onComplete={backSignInPage} /> giây.
      </Typography>
      <Button size='large' component={Link} href='/sign-in' onClick={handleOnClick}>
        {isLoadingToSignIn ? (
          <CircularProgress sx={{ color: colors.neutral.white, padding: '5px' }} />
        ) : (
          <div>Đăng nhập</div>
        )}
      </Button>
    </CardLayout>
  ) : isLoadingPage ? (
    <CircularProgress sx={{ color: 'primary.main', alignSelf: 'center' }} />
  ) : (
    <CardLayout header='Thay đổi mật khẩu'>
      {alertMessage !== '' && (
        <Alert
          icon={false}
          severity='error'
          onClose={() => {
            setAlertMessage('');
          }}>
          {alertMessage}
        </Alert>
      )}
      <Formik
        initialValues={{
          password: '',
          repassword: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={ForgetPasswordSchema}>
        {({ touched, errors }) => {
          return (
            <StyledForm id='change-pass-form'>
              <InputLayout label='Mật khẩu mới' helperText={touched.password ? errors.password : ''}>
                <Field
                  as={PasswordInput}
                  name='password'
                  placeholder='Nhập mật khẩu mới'
                  error={Boolean(touched.password && errors.password)}
                />
              </InputLayout>
              <InputLayout label='Nhập lại mật khẩu mới' helperText={touched.repassword ? errors.repassword : ''}>
                <Field
                  as={PasswordInput}
                  name='repassword'
                  placeholder='Nhập lại mật khẩu mới'
                  error={Boolean(touched.repassword && errors.repassword)}
                />
              </InputLayout>
            </StyledForm>
          );
        }}
      </Formik>
      <Button size='large' type='submit' form='change-pass-form'>
        {isLoadingChange ? (
          <CircularProgress sx={{ color: colors.neutral.white, padding: '5px' }} />
        ) : (
          <div>Thay đổi</div>
        )}
      </Button>
    </CardLayout>
  );
}

export default ChangePasswordPage;
