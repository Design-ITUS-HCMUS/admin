'use client';
import React from 'react';
import { Field, Form, Formik } from 'formik';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { InputLayout, LoadingButton, PasswordInput } from '@/libs/ui';
import { ForgetPasswordSchema } from '@/libs/validations';

export function EditPassword() {
  function handleSubmit(values: any) {
    const _body = {
      usernameOrEmail: '',
      password: values.password,
    };

    // fetch('/api/auth/resetPassword', { method: 'POST', body: JSON.stringify(body) })
    //   .then((response) => response.json())
    //   .then(({ success, message }) => {
    //     if (success) {
    //       alert('Đổi mật khẩu thành công');
    //     } else {
    //       throw new Error(message);
    //     }
    //   })
    //   .catch((error) => {
    //     alert('Đổi mật khẩu thất bại ' + error.message);
    //     console.error(error);
    //   });
  }

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        password: '',
        repassword: '',
      }}
      validationSchema={ForgetPasswordSchema}
      onSubmit={handleSubmit}>
      {({ touched, errors, isSubmitting, isValid }) => (
        <Form id='change-password'>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
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
                <InputLayout label='Nhập lại mật khẩu mới' helperText={errors.repassword}>
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
              </Stack>
            </Grid>
            <Grid item xs={0} md={6} />
          </Grid>
          <Button variant='text' type='reset' sx={{ width: 'fit-content', mt: 2, mr: 2 }}>
            Hủy
          </Button>
          <LoadingButton
            type='submit'
            sx={{ width: 'fit-content', mt: 2 }}
            loading={isSubmitting}
            disabled={!isValid || isSubmitting || Object.keys(touched).length === 0}>
            Lưu
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
}
