'use client';
import { Field, Formik } from 'formik';

// Material UI Components
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

// Material UI Icons
import MailIcon from '@mui/icons-material/EmailOutlined';
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardLayout, StyledForm } from '@/app/(auth)/_components';
import { InputLayout, PasswordInput } from '@/libs/ui';
import { SignupSchema } from '@/libs/validations';

interface IFormData {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

function SignUpPage() {
  function handleSubmit(values: IFormData) {
    /* eslint-disable no-console */
    console.log('Submit sign-up-form', values);
  }
  return (
    <CardLayout header='Đăng ký tài khoản' showFooter page='signup'>
      <Formik
        initialValues={
          {
            username: '',
            email: '',
            password: '',
            repassword: '',
          } as IFormData
        }
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}>
        {({ touched, errors }) => (
          <StyledForm id='sign-up-form'>
            <InputLayout
              label='Username'
              inputProps={{
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
        )}
      </Formik>
      <Button size='large' form='sign-up-form' type='submit'>
        Đăng ký
      </Button>
    </CardLayout>
  );
}

export default SignUpPage;
