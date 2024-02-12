'use client';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import MoreIcon from '@mui/icons-material/MoreHorizRounded';

import members from '@/libs/mock/members.json';
import { InputLayout } from '@/libs/ui';
import { MemberInfoValues, MemberInfoSchema } from '@/libs/validations';
import { DEPARTMENT } from '@/utils';
import { SelectDepartment, SelectPosition, SelectRole } from '../_components';

const FormWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function MemberDetailsPage({ params }: { params: { id: string } }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [readOnly, setReadOnly] = useState(true);
  const id = parseInt(params.id) - 1;

  const initialValues = {
    username: members[id].username,
    email: members[id].email,
    role: members[id].role,
    profile: {
      fullName: members[id].profile?.fullName,
      phone: members[id].profile?.phone,
      studentID: members[id].profile?.studentId,
      gen: members[id].profile?.gen,
      school: members[id].profile?.school,
      dob: new Date(members[id].profile?.dob),
      departments: members[id].profile?.departments as DEPARTMENT[],
      position: members[id].profile?.position,
      facebook: members[id].profile?.facebook,
    },
  } as MemberInfoValues;

  const handleSubmit = (values: MemberInfoValues) => {
    /* eslint-disable */
    console.log('Submit edit-info-member', values);
    setReadOnly(true);
  };

  return (
    <>
      <Stack direction='row' alignItems='baseline' justifyContent='space-between'>
        <Typography variant='h6' fontWeight='600'>
          Thông tin tài khoản
        </Typography>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreIcon />
        </IconButton>
      </Stack>
      <FormWrapper>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={MemberInfoSchema}>
          {({ resetForm, touched, errors }) => (
            <Stack id='edit-info-member-form' component={Form} spacing={2} sx={{ width: '75%' }} alignItems='center'>
              <InputLayout
                label='Username'
                direction='row'
                ratio={0.25}
                required={!readOnly}
                inputProps={{
                  name: 'username',
                  readOnly: readOnly,
                  disabled: true,
                }}
                formik
              />
              <InputLayout
                label='Họ và tên'
                direction='row'
                ratio={0.25}
                required={!readOnly}
                inputProps={{
                  name: 'profile.fullName',
                  readOnly: readOnly,
                  disabled: true,
                }}
                formik
              />
              <InputLayout
                label='Email'
                direction='row'
                ratio={0.25}
                required={!readOnly}
                inputProps={{
                  name: 'email',
                  readOnly: readOnly,
                  disabled: true,
                }}
                formik
              />
              <InputLayout
                label='Số điện thoại'
                direction='row'
                ratio={0.25}
                inputProps={{
                  name: 'profile.phone',
                  readOnly: readOnly,
                  error: Boolean(touched.profile?.phone && errors.profile?.phone),
                }}
                formik
                helperText={touched.profile?.phone ? errors.profile?.phone : ''}
              />
              <InputLayout
                label='MSSV'
                direction='row'
                ratio={0.25}
                inputProps={{
                  name: 'profile.studentID',
                  readOnly: readOnly,
                }}
                formik
              />
              <InputLayout
                label='Gen'
                direction='row'
                ratio={0.25}
                required={!readOnly}
                inputProps={{
                  name: 'profile.gen',
                  readOnly: readOnly,
                }}
                formik
              />
              <InputLayout
                label='Trường'
                direction='row'
                ratio={0.25}
                inputProps={{
                  name: 'profile.school',
                  readOnly: readOnly,
                }}
                formik
              />
              <InputLayout label='Ngày sinh' direction='row' ratio={0.25}>
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
                          readOnly={readOnly}
                          views={['year', 'month', 'day']}
                          format='DD/MM/YYYY'
                          onChange={handleDateChange}
                        />
                      );
                    }}
                  </Field>
                </LocalizationProvider>
              </InputLayout>
              <SelectDepartment ratio={0.25} readOnly={readOnly} />
              <SelectPosition ratio={0.25} readOnly={readOnly} />
              <SelectRole ratio={0.25} readOnly={readOnly} />
              <InputLayout
                label='Facebook'
                direction='row'
                ratio={0.25}
                inputProps={{
                  name: 'profile.facebook',
                  readOnly: readOnly,
                  error: Boolean(touched.profile?.facebook && errors.profile?.facebook),
                }}
                formik
                helperText={touched.profile?.facebook ? errors.profile?.facebook : ''}
              />
              {!Boolean(readOnly) && (
                <Stack direction='row' spacing={1} alignItems='left' sx={{ width: '100%' }}>
                  <Button
                    variant='text'
                    type='reset'
                    form='edit-info-member-form'
                    onClick={() => {
                      resetForm();
                      setReadOnly(true);
                    }}>
                    Hủy
                  </Button>
                  <Button type='submit' form='edit-info-member-form'>
                    Lưu
                  </Button>
                </Stack>
              )}
            </Stack>
          )}
        </Formik>
      </FormWrapper>
      <Menu
        anchorEl={anchorEl}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setReadOnly(false)}>Chỉnh sửa</MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem sx={{ color: 'error.main' }}>Xóa tài khoản</MenuItem>
      </Menu>
      <Typography variant='h6' fontWeight='600'>
        Sự kiện tham gia
      </Typography>
    </>
  );
}
