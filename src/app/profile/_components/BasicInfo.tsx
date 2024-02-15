import React from 'react';
import { Form, Formik, Field } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { InputLayout } from '@/libs/ui';

import { EditBasicInfoSchema } from '@/libs/validations';

import { IBasicInfo } from '../page';

export function BasicInfo({
  initialValues,
  refreshHandler,
}: {
  initialValues: IBasicInfo | undefined;
  refreshHandler: () => void;
}) {
  function handleSubmit(values: any) {
    // Remove unnecessary fields
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, userID, email, ...filtered } = values;

    const body = {
      id: values.userID,
      data: {
        profile: filtered,
      },
    };

    fetch('/api/user/information-update', { method: 'PUT', body: JSON.stringify(body) })
      .then((response) => response.json())
      .then(({ success, message }) => {
        if (success) {
          alert('Cập nhật thông tin thành công');
          refreshHandler();
        } else throw new Error(message);
      })
      .catch((error) => {
        alert('Cập nhật thông tin thất bại ' + error.message);
        console.error(error);
      });
  }

  return (
    !!initialValues && (
      <Formik initialValues={initialValues} validationSchema={EditBasicInfoSchema} onSubmit={handleSubmit}>
        {({ initialValues, errors, isValid, isSubmitting, touched }) => (
          <Form id='basic-info'>
            <Field type='hidden' name='userID' />
            <Grid container columnSpacing={2} rowSpacing={1}>
              <Grid item xs={6}>
                <InputLayout
                  label='Họ và tên'
                  formik
                  helperText={errors.fullName}
                  inputProps={{
                    name: 'fullName',
                    error: Boolean(errors.fullName),
                  }}></InputLayout>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1} useFlexGap>
                  <InputLayout label='Ngày sinh'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        name='dob'
                        value={initialValues.dob}
                        views={['year', 'month', 'day']}
                        format='DD/MM/YYYY'
                      />
                    </LocalizationProvider>
                  </InputLayout>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <InputLayout
                  label='Email'
                  formik
                  inputProps={{
                    name: 'email',
                    disabled: true,
                  }}></InputLayout>
              </Grid>
              <Grid item xs={6}>
                <InputLayout
                  label='Số điện thoại'
                  formik
                  helperText={errors.phone}
                  inputProps={{
                    name: 'phone',
                    error: Boolean(errors.phone),
                  }}></InputLayout>
              </Grid>
              <Grid item xs={6}>
                <InputLayout
                  label='Facebook'
                  formik
                  helperText={errors.facebook}
                  inputProps={{
                    name: 'facebook',
                    error: Boolean(errors.facebook),
                  }}></InputLayout>
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={6}>
                <InputLayout
                  label='Trường'
                  formik
                  containerProps={{ width: '50%' }}
                  inputProps={{
                    name: 'school',
                  }}
                />
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={6}>
                <InputLayout
                  label='Mã số sinh viên'
                  formik
                  containerProps={{ width: '50%' }}
                  inputProps={{
                    name: 'studentID',
                  }}
                />
              </Grid>
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
    )
  );
}
