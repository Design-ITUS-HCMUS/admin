'use client';

// React, Formik and Next
import { useState } from 'react';
import { Field, Formik } from 'formik';
import { useRouter } from 'next/navigation';

// Material UI Components
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';

// Material UI Icons
import MailIcon from '@mui/icons-material/EmailOutlined';
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardLayout, StyledForm } from '@/app/(auth)/_components';
import { useAuthContext } from '@/app/(auth)/_context/store';
import { colors, InputLayout, PasswordInput } from '@/libs/ui';
import { SignupSchema } from '@/libs/validations';

interface IFormData {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

function SignUpPage() {
  const router = useRouter();
  const { signUp, setSignUp } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(values: IFormData) {
    setIsLoading(true);
    fetch('/api/auth/otpRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: values.username, email: values.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.push('/sign-up/otp');
        } else {
          setIsLoading(false);
        }
      });
  }

  return (
    <CardLayout header='Đăng ký tài khoản' showFooter page='signup'>
      <Formik
        initialValues={
          {
            username: signUp.username,
            email: signUp.email,
            password: signUp.password,
            repassword: '',
          } as IFormData
        }
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}>
        {({ touched, errors, handleChange }) => {
          const handleSaveState = (e: React.ChangeEvent<any>) => {
            setSignUp({ ...signUp, [e.target.name]: e.target.value });
            handleChange(e); // This is to update Formik state
          };

          return (
            <StyledForm id='sign-up-form'>
              <InputLayout
                label='Username'
                inputProps={{
                  onChange: handleSaveState,
                  name: 'username',
                  placeholder: 'Username',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  error: Boolean(touched.username && errors.username),
                }}
                formik
                helperText={touched.username ? errors.username : undefined}
              />
              <InputLayout
                label='Email'
                inputProps={{
                  onChange: handleSaveState,
                  name: 'email',
                  placeholder: 'Email',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <MailIcon />
                    </InputAdornment>
                  ),
                  error: Boolean(touched.email && errors.email),
                }}
                formik
                helperText={touched.email ? errors.email : undefined}
              />
              <InputLayout label='Mật khẩu' helperText={touched.password ? errors.password : undefined}>
                <Field
                  as={PasswordInput}
                  name='password'
                  onChange={handleSaveState}
                  inputProps={{
                    placeholder: 'Nhập mật khẩu',
                  }}
                  error={Boolean(touched.password && errors.password)}
                />
              </InputLayout>
              <InputLayout label='Nhập lại mật khẩu' helperText={touched.repassword ? errors.repassword : undefined}>
                <Field
                  as={PasswordInput}
                  name='repassword'
                  inputProps={{
                    placeholder: 'Nhập lại mật khẩu',
                  }}
                  error={Boolean(touched.repassword && errors.repassword)}
                />
              </InputLayout>
            </StyledForm>
          );
        }}
      </Formik>
      <Button size='large' form='sign-up-form' type='submit'>
        {isLoading ? <CircularProgress sx={{ color: colors.neutral.white, padding: '5px' }} /> : <div>Đăng ký</div>}
      </Button>
    </CardLayout>
  );
}

export default SignUpPage;
