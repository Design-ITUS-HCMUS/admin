'use client';
import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import { InputLayout } from '@/libs/ui';
import { MemberInfoValues, MemberInfoSchema } from '@/libs/validations';
import { ROLE, POSITION, DEPARTMENT } from '@/utils';
import { SelectDepartment, SelectPosition, SelectRole } from './CustomSelect';

interface CreateAccountModalProps {
  /**Control the state <code>open</code> of the MUI Dialog root component*/
  open: boolean;
  /**The callback function to be executed when the MUI Dialog root component is closed*/
  onClose: () => void;
}

export function CreateAccountModal(props: CreateAccountModalProps) {
  const { open, onClose } = props;
  const gen = new Date();

  const initialValues: MemberInfoValues = {
    username: '',
    email: '',
    role: ROLE.MEMBER,
    profile: {
      fullName: '',
      gen: gen.getFullYear() - 2010,
      school: '',
      studentID: '',
      phone: '',
      dob: new Date(),
      position: POSITION.TV,
      departments: [] as DEPARTMENT[],
      facebook: '',
    },
  };

  const handleSubmit = (values: MemberInfoValues) => {
    /* eslint-disable */
    console.log('Submit create-member', values);
  };

  return (
    <Dialog open={open} onClose={onClose} scroll='paper' maxWidth='sm' fullWidth PaperProps={{ variant: 'section' }}>
      <DialogTitle id='alert-dialog-title' fontWeight={'bold'}>
        Tạo tài khoản
      </DialogTitle>
      <DialogContent id='alert-dialog-description'>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={MemberInfoSchema}>
          {({ touched, errors }) => (
            <Form id='create-member-form'>
              <Stack spacing={2}>
                <InputLayout
                  label='Username'
                  required
                  inputProps={{
                    name: 'username',
                    placeholder: '<Gen><Họ và tên viết tắt> VD: 11nvanh',
                    error: Boolean(touched.username && errors.username),
                  }}
                  formik
                  helperText={touched.username ? errors.username : ''}
                />
                <InputLayout
                  label='Họ và tên'
                  required
                  inputProps={{
                    name: 'profile.fullName',
                    placeholder: 'Nguyễn Văn Anh',
                    error: Boolean(touched.profile?.fullName && errors.profile?.fullName),
                  }}
                  formik
                  helperText={touched.profile?.fullName ? errors.profile?.fullName : ''}
                />
                <Stack spacing={2} direction='row' sx={{ width: '100%' }}>
                  <InputLayout
                    label='Email'
                    required
                    inputProps={{
                      name: 'email',
                      placeholder: 'nvananh@gmail.com',
                      error: Boolean(touched.email && errors.email),
                    }}
                    formik
                    helperText={touched.email ? errors.email : ''}
                  />
                  <InputLayout
                    label='Số điện thoại'
                    inputProps={{
                      name: 'profile.phone',
                      placeholder: '0909123456',
                      error: Boolean(touched.profile?.phone && errors.profile?.phone),
                    }}
                    formik
                    helperText={touched.profile?.phone ? errors.profile?.phone : ''}
                  />
                </Stack>
                <Stack spacing={2} direction='row'>
                  <InputLayout
                    label='MSSV'
                    inputProps={{ name: 'profile.studentID', placeholder: '21120001' }}
                    formik
                  />
                  <InputLayout label='Gen' required inputProps={{ name: 'profile.gen', placeholder: '11' }} formik />
                </Stack>
                <InputLayout
                  label='Trường'
                  inputProps={{ name: 'profile.school', placeholder: 'ĐH Khoa học tự nhiên' }}
                  formik
                />
                <InputLayout label='Ngày sinh' direction='row' ratio={0.5}>
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
                          />
                        );
                      }}
                    </Field>
                  </LocalizationProvider>
                </InputLayout>
                <SelectDepartment />
                <SelectRole />
                <SelectPosition />
                <InputLayout
                  label='Facebook'
                  inputProps={{
                    name: 'profile.facebook',
                    type: 'url',
                    placeholder: 'www.facebook.com/nvananh',
                    error: Boolean(touched.profile?.facebook && errors.profile?.facebook),
                  }}
                  formik
                  helperText={touched.profile?.facebook ? errors.profile?.facebook : ''}
                />
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='text'>
          Cancel
        </Button>
        <Button form='create-member-form' type='submit'>
          Tạo tài khoản
        </Button>
      </DialogActions>
    </Dialog>
  );
}
