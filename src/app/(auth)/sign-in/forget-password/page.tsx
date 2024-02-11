'use client';

// React
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import * as yup from 'yup';

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
  function handleSubmit(values: { username: string }) {
    /* eslint-disable no-console */
    console.log('Submit forget-password-form', values);
    router.push('/sign-in/forget-password/otp');
  }

  return (
    <CardLayout header='Quên mật khẩu' showFooter page='signin'>
      <Formik
        initialValues={{
          username: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          username: yup.string().required('Vui lòng nhập username hoặc email'),
        })}>
        {({ touched, errors }) => (
          <StyledForm id='forget-password-form'>
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
                error: Boolean(touched.username && errors.username),
              }}
              formik
              helperText={touched.username ? errors.username : ''}
            />
          </StyledForm>
        )}
      </Formik>
      <Button size='large' type='submit' form='forget-password-form'>
        Gửi mã
      </Button>
    </CardLayout>
  );
}

export default ForgetPasswordPage;
