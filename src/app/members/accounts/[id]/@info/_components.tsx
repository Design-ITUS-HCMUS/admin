'use client';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Field, Form, Formik } from 'formik';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MoreIcon from '@mui/icons-material/MoreHorizRounded';

import 'dayjs/locale/en-gb';

import { useToast } from '@/hooks';
import { User } from '@/libs/models';
import { useUsers } from '@/libs/query';
import { InputLayout, LoadingButton } from '@/libs/ui';
import { MemberInfoSchema } from '@/libs/validations';
import { DeleteAccountModal, SelectDepartment, SelectPosition } from '../../_components';

export default function InfoSection({ id }: { id: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
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

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!Boolean(data)) throw new Error('Không tìm thấy người dùng này.');

  const handleSubmit = (values: User) => {
    mutate(values, {
      onSuccess: () => {
        toast.setAlert({
          alert: 'success',
          message: {
            title: 'Cập nhật thông tin thành công',
            description: 'Vui lòng chờ trong giây lát để hệ thống cập nhật giao diện.',
          },
        });
        setReadOnly(true);
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
  };

  return (
    <section>
      <Stack direction='row' alignItems='baseline' justifyContent='space-between'>
        <Typography variant='h6' fontWeight='600'>
          Thông tin tài khoản
        </Typography>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreIcon />
        </IconButton>
      </Stack>
      <DeleteAccountModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        userID={parseInt(data.id)}
        fullName={data.profile?.fullName || data.username}
      />
      <Stack alignItems='center' justifyContent='center'>
        <Formik
          initialValues={data as User}
          onSubmit={handleSubmit}
          enableReinitialize
          validateOnMount
          validationSchema={MemberInfoSchema}>
          {({ resetForm, touched, errors, isValid }) => (
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
                helperText={errors.profile?.phone}
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
              <InputLayout label='Ngày sinh' direction='row' ratio={0.25} helperText={errors.profile?.dob}>
                <Field name='profile.dob'>
                  {({ field, form }: { field: any; form: any }) => {
                    const handleDateChange = (date: any) => {
                      form.setFieldValue(field.name, date);
                    };
                    return (
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                        <DateTimePicker
                          {...field}
                          value={field.value ? dayjs(field.value) : null}
                          readOnly={readOnly}
                          views={['year', 'month', 'day']}
                          onChange={handleDateChange}
                          error={Boolean(touched.profile?.dob && errors.profile?.dob)}
                        />
                      </LocalizationProvider>
                    );
                  }}
                </Field>
              </InputLayout>
              <SelectDepartment ratio={0.25} readOnly={readOnly} />
              <SelectPosition ratio={0.25} readOnly={readOnly} />
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
                helperText={errors.profile?.facebook || ''}
              />
              {!Boolean(readOnly) && (
                <Stack direction='row' spacing={1} alignItems='left' sx={{ width: '100%' }}>
                  <Button
                    variant='text'
                    type='reset'
                    form='edit-info-member-form'
                    disabled={status === 'pending'}
                    onClick={() => {
                      resetForm();
                      setReadOnly(true);
                    }}>
                    Hủy
                  </Button>
                  <LoadingButton
                    type='submit'
                    form='edit-info-member-form'
                    loading={status === 'pending'}
                    disabled={!isValid || Object.keys(touched).length === 0}>
                    Lưu
                  </LoadingButton>
                </Stack>
              )}
            </Stack>
          )}
        </Formik>
      </Stack>
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
    </section>
  );
}
