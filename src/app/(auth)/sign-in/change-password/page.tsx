'use client';

// React
import { useRouter } from 'next/navigation';
import { Field, Formik } from 'formik';

// Material UI Components
import Button from '@mui/material/Button';

// Internal
import { CardLayout, StyledForm } from '@/app/(auth)/_components';
// Libs
import { InputLayout, PasswordInput } from '@/libs/ui';
import { ForgetPasswordSchema } from '@/libs/validations';

function ChangePasswordPage() {
  const router = useRouter();
  function handleSubmit(values: { password: string; repassword: string }) {
    /* eslint-disable no-console */
    console.log('Submit change-pass-form', values);
    router.push('/sign-in/change-password/success');
  }
  return (
    <CardLayout header='Thay đổi mật khẩu'>
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
        Thay đổi
      </Button>
    </CardLayout>
  );
}

export default ChangePasswordPage;
