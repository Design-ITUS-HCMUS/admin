import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { PasswordInput, InputLayout } from '@/libs/ui';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { ForgetPasswordSchema } from '@/libs/validations';

export function EditPassword({ usernameOrEmail }: { usernameOrEmail: string | undefined }) {
  function handleSubmit(values: any, formikHelpers: FormikHelpers<any>) {
    const body = {
      usernameOrEmail: values.usernameOrEmail,
      password: values.password,
    };

    fetch('/api/auth/resetPassword', { method: 'POST', body: JSON.stringify(body) })
      .then((response) => response.json())
      .then(({ success, message }) => {
        if (success) {
          alert('Đổi mật khẩu thành công');
          formikHelpers.resetForm();
        } else {
          throw new Error(message);
        }
      })
      .catch((error) => {
        alert('Đổi mật khẩu thất bại ' + error.message);
        console.error(error);
      });
  }

  if (!usernameOrEmail) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        usernameOrEmail: usernameOrEmail,
        currentPassword: '',
        password: '',
        repassword: '',
      }}
      validationSchema={ForgetPasswordSchema}
      onSubmit={handleSubmit}>
      {({ touched, errors, isSubmitting, isValid }) => (
        <Form id='change-password'>
          <Field type='hidden' name='usernameOrEmail' />
          <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item xs={6}>
              <InputLayout
                label='Mật khẩu cũ'
                helperText={touched.currentPassword ? errors.currentPassword : undefined}>
                <Field
                  as={PasswordInput}
                  name='currentPassword'
                  inputProps={{
                    autoComplete: 'password',
                    placeholder: 'Nhập mật khẩu',
                  }}
                  error={Boolean(touched.currentPassword && errors.currentPassword)}
                />
              </InputLayout>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <InputLayout label='Mật khẩu mới' helperText={touched.password ? errors.password : undefined}>
                <Field
                  as={PasswordInput}
                  name='password'
                  inputProps={{
                    autoComplete: 'new-password',
                    placeholder: 'Nhập mật khẩu mới',
                  }}
                  error={Boolean(touched.password && errors.password)}
                />
              </InputLayout>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <InputLayout
                label='Nhập lại mật khẩu mới'
                helperText={touched.repassword ? errors.repassword : undefined}>
                <Field
                  as={PasswordInput}
                  name='repassword'
                  inputProps={{
                    autoComplete: 'new-password',
                    placeholder: 'Nhập lại mật khẩu mới',
                  }}
                  error={Boolean(touched.repassword && errors.repassword)}
                />
              </InputLayout>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
          <Button type='reset' sx={{ width: 'fit-content', mt: 2, mr: 2 }}>
            Hủy
          </Button>
          <Button
            type='submit'
            sx={{ width: 'fit-content', mt: 2 }}
            disabled={!isValid || isSubmitting || Object.keys(touched).length === 0}>
            Lưu
          </Button>
        </Form>
      )}
    </Formik>
  );
}
