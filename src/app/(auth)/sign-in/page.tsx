'use client';
// React, Formik and Next
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Field, Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';

// Material UI Components
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
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
import { colors, InputLayout, PasswordInput } from '@/libs/ui';
import { useAuthContext } from '@/app/(auth)/_context/store';
import { SigninSchema } from '@/libs/validations';

interface SignInProps {
  username: string;
  password: string;
}

const signInMutation = async (values: SignInProps): Promise<number> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usernameOrEmail: values.username, password: values.password }),
  });

  return response.status;
};

function SignInPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { signIn, setSignIn } = useAuthContext();
  const [alertMessage, setAlertMessage] = React.useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: signInMutation,
    onError: (error: any) => {
      if (error instanceof Error) {
        setAlertMessage(error.message);
      }
    },
    onSuccess: (status: number) => {
      switch (status) {
        case 200:
          router.push('/');
          break;
        case 400:
          setAlertMessage('Chưa có thông tin username hoặc mật khẩu');
          break;
        case 403:
          setAlertMessage('Username hoặc mật khẩu không đúng');
          break;
        default:
          setAlertMessage('Đăng nhập thất bại, vui lòng thử lại');
          break;
      }
    },
  });

  async function handleSubmit(values: { username: string; password: string }) {
    mutate(values);
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
          username: signIn.username || '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={SigninSchema}>
        {({ touched, errors, handleChange }) => {
          const handleSaveState = (e: React.ChangeEvent<any>) => {
            setSignIn({ ...signIn, [e.target.name]: e.target.value });
            handleChange(e); // This is to update Formik state
          };

          return (
            <StyledForm id='sign-in-form'>
              <InputLayout
                label='Nhập username hoặc email'
                inputProps={{
                  onChange: handleSaveState,
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
          );
        }}
      </Formik>
      <Button size='large' type='submit' form='sign-in-form'>
        {isPending ? <CircularProgress sx={{ color: colors.neutral.white, padding: '5px' }} /> : <div>Đăng nhập</div>}
      </Button>
    </CardLayout>
  );
}

export default SignInPage;
