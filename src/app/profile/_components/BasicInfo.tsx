'use client';
import React from 'react';
import { Form, Formik, Field } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { InputLayout, LoadingButton } from '@/libs/ui';
import { ProfileBasicInfoSchema } from '@/libs/validations';
import { User } from '@/libs/models';
import { useToast } from '@/hooks';
import { useUsers } from '@/libs/query';

export function BasicInfo({ id }: { id: string }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { getUserByID, updateInfo } = useUsers();
  const { data, refetch } = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserByID(id),
  });

  const { mutate, status } = useMutation({
    mutationFn: (data: User) => updateInfo(id, data),
    mutationKey: ['users', 'updateInfo', id],
    onSuccess: (data) => {
      queryClient.setQueryData(['users', id], data);
      // Invalidate all users queries start with key 'users'
      // Expected result: all queries must refetch, both active and inactive state.
      queryClient.invalidateQueries({ queryKey: ['users'], refetchType: 'all' });
    },
  });

  React.useEffect(() => {
    refetch();
  }, [id, refetch]);

  function handleSubmit(values: User) {
    mutate(values, {
      onSuccess: () => {
        toast.setAlert({
          alert: 'success',
          message: {
            title: 'Cập nhật thông tin thành công',
            description: 'Vui lòng chờ trong giây lát để hệ thống cập nhật giao diện.',
          },
        });
      },
      onError: () => {
        toast.setAlert({
          alert: 'error',
          message: {
            title: 'Cập nhật thông tin thất bại',
            description: 'Vui lòng thử lại sau ít phút nữa, nếu có trục trặc vui lòng liên hệ đội ngũ phát triển.',
          },
        });
      },
      onSettled: () => {
        toast.setOpen();
      },
    });
  }

  return (
    <Formik initialValues={data} validationSchema={ProfileBasicInfoSchema} onSubmit={handleSubmit}>
      {({ errors, touched, resetForm, isValid }) => (
        <Form id='basic-info'>
          <Field type='hidden' name='id' />
          <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item xs={12} md={6}>
              <InputLayout
                label='Họ và tên'
                formik
                inputProps={{
                  name: 'profile.fullName',
                  error: touched.profile?.fullName && Boolean(errors.profile?.fullName),
                }}
                helperText={touched.profile?.fullName ? errors.profile?.fullName : ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLayout label='Ngày sinh' helperText={errors.profile?.dob}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Field name='profile.dob'>
                    {({ field, form }: { field: any; form: any }) => {
                      const handleDateChange = (date: any) => {
                        form.setFieldValue(field.name, date);
                      };
                      return (
                        <DateTimePicker
                          {...field}
                          value={field.value ? dayjs(field.value) : null}
                          views={['year', 'month', 'day']}
                          format='DD/MM/YYYY'
                          onChange={handleDateChange}
                          error={Boolean(touched.profile?.dob && errors.profile?.dob)}
                        />
                      );
                    }}
                  </Field>
                </LocalizationProvider>
              </InputLayout>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLayout
                label='Email'
                formik
                inputProps={{
                  name: 'email',
                  disabled: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLayout
                label='Số điện thoại'
                formik
                helperText={errors.profile?.phone}
                inputProps={{
                  name: 'profile.phone',
                  error: Boolean(touched.profile?.phone && errors.profile?.phone),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLayout
                label='Facebook'
                formik
                helperText={errors.profile?.facebook}
                inputProps={{
                  name: 'profile.facebook',
                  error: Boolean(touched.profile?.facebook && errors.profile?.facebook),
                }}></InputLayout>
            </Grid>
            <Grid item xs={0} md={6} />
            <Grid item xs={12} md={6}>
              <InputLayout
                label='Trường'
                formik
                containerProps={{ width: '50%' }}
                inputProps={{
                  name: 'profile.school',
                }}
              />
            </Grid>
            <Grid item xs={0} md={6} />
            <Grid item xs={12} md={6}>
              <InputLayout
                label='Mã số sinh viên'
                formik
                containerProps={{ width: '50%' }}
                inputProps={{
                  name: 'profile.studentID',
                }}
              />
            </Grid>
          </Grid>
          <Button variant='text' type='reset' sx={{ width: 'fit-content', mt: 2, mr: 2 }} onClick={() => resetForm()}>
            Hủy
          </Button>
          <LoadingButton
            type='submit'
            sx={{ width: 'fit-content', mt: 2 }}
            loading={status === 'pending'}
            disabled={!isValid || Object.keys(touched).length === 0}>
            Lưu
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
}
