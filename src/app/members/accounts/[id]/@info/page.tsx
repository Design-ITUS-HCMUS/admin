'use client';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/navigation';
import { pick } from 'lodash';
import { useState, useEffect } from 'react';
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

import { InputLayout, LoadingButton } from '@/libs/ui';
import { MemberInfoValues, MemberInfoSchema } from '@/libs/validations';
import { POSITION } from '@/utils';
import { useToast } from '@/hooks';
import { SelectDepartment, SelectPosition, SelectRole, DeleteAccountModal } from '../../_components';
import Loading from './loading';

const FormWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const initialValues = {
  username: '',
  email: '',
  roleID: 2,
  profile: {
    fullName: '',
    phone: '',
    studentID: '',
    gen: 11,
    school: '',
    dob: new Date(),
    departments: [],
    position: POSITION.TV,
    facebook: '',
  },
} as MemberInfoValues;

export default function InfoSection({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [userData, setUserData] = useState<MemberInfoValues>(initialValues);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    fetch(`/api/user?id=${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        const { success, data, message } = res;
        if (success) {
          setUserData(data);
        } else throw new Error(message as string);
      })
      .catch((e) => {
        toast.setAlert({
          alert: 'error',
          message: { title: 'Không thể tải dữ liệu người dùng này', description: e.message },
        });
        toast.setOpen();
        router.push('/members/accounts');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (values: MemberInfoValues) => {
    const request = {
      id: params.id,
      data: {
        profile: {
          ...pick(values.profile, Object.keys(initialValues.profile)),
        },
      },
    };
    setSaving(true);
    fetch('/api/user/information-update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (success) {
          setUserData(data);
          toast.setAlert({ alert: 'success', message: { title: 'Cập nhật thông tin thành công' } });
        } else throw new Error('Có lỗi khi cập nhật thông tin');
      })
      .catch((e) =>
        toast.setAlert({ alert: 'error', message: { title: 'Cập nhật thông tin thất bại', description: e.message } })
      )
      .finally(() => {
        toast.setOpen();
        setReadOnly(true);
        setSaving(false);
      });
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <DeleteAccountModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            userID={parseInt(params.id)}
            fullName={userData.profile?.fullName || userData.username}
          />
          <FormWrapper>
            <Formik
              initialValues={userData}
              enableReinitialize
              onSubmit={handleSubmit}
              validateOnMount
              validationSchema={MemberInfoSchema}>
              {({ resetForm, touched, errors }) => (
                <Stack
                  id='edit-info-member-form'
                  component={Form}
                  spacing={2}
                  sx={{ width: '75%' }}
                  alignItems='center'>
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
                    }}
                    formik
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
                    inputProps={{
                      name: 'profile.gen',
                      readOnly: readOnly,
                      type: 'number',
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
                        disabled={saving}
                        onClick={() => {
                          resetForm();
                          setReadOnly(true);
                        }}>
                        Hủy
                      </Button>
                      <LoadingButton type='submit' form='edit-info-member-form' loading={saving}>
                        Lưu
                      </LoadingButton>
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
            <MenuItem onClick={() => setOpenModal(true)} sx={{ color: 'error.main' }}>
              Xóa tài khoản
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
}
