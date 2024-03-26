'use client';

// React
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import * as yup from 'yup';

// Material UI Components
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';

// Material UI Icons
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardLayout, StyledForm } from '@/app/(auth)/_components';
import { useAuthContext } from '@/app/(auth)/_context/store';
// Libs
import { colors } from '@/libs/ui';
import { InputLayout } from '@/libs/ui/components';

function ForgetPasswordPage() {
  const router = useRouter();
  const { signIn, setSignIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  async function handleSubmit(values: { username: string }) {
    try {
      setIsLoading(true);

      const response = await fetch('/api/auth/otpResetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail: values.username }),
      });

      switch (response.status) {
        case 200:
          setSignIn({ ...signIn, isForgettingPassword: true });
          router.push('/sign-in/forget-password/otp');
          break;
        case 403:
          setAlertMessage('Username hoặc email không tồn tại');
          throw new Error('Invalid username or email');
        default:
          setAlertMessage('Gửi mã thất bại, vui lòng thử lại');
          throw new Error('Error message');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      setIsLoading(false);
    }
  }

  return (
    <CardLayout header='Quên mật khẩu' showFooter page='signin'>
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
          username: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          username: yup.string().required('Vui lòng nhập username hoặc email'),
        })}>
        {({ touched, errors, handleChange }) => {
          const handleSaveState = (e: React.ChangeEvent<any>) => {
            setSignIn({ ...signIn, [e.target.name]: e.target.value });
            handleChange(e); // This is to update Formik state
          };

          return (
            <StyledForm id='forget-password-form'>
              <InputLayout
                label='Username'
                inputProps={{
                  onChange: handleSaveState,
                  name: 'username',
                  placeholder: 'Username hoặc email đã đăng ký',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  error: Boolean(touched.username && errors.username),
                }}
                formik
                helperText={touched.username ? errors.username : ''}
              />
            </StyledForm>
          );
        }}
      </Formik>
      <Button size='large' type='submit' form='forget-password-form'>
        {isLoading ? <CircularProgress sx={{ color: colors.neutral.white, padding: '5px' }} /> : <div>Gửi mã</div>}
      </Button>
    </CardLayout>
  );
}

export default ForgetPasswordPage;
