'use client';
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
import { SelectDepartment, SelectPosition, SelectRole } from './CustomSelect';

interface CreateAccountModalProps {
  /**Control the state <code>open</code> of the MUI Dialog root component*/
  open: boolean;
  /**The callback function to be executed when the MUI Dialog root component is closed*/
  onClose: () => void;
}

export function CreateAccountModal(props: CreateAccountModalProps) {
  const { open, onClose } = props;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <Dialog open={open} onClose={onClose} scroll='paper' maxWidth='sm' fullWidth PaperProps={{ variant: 'section' }}>
      <DialogTitle id='alert-dialog-title' fontWeight={'bold'}>
        Tạo tài khoản
      </DialogTitle>
      <DialogContent id='alert-dialog-description'>
        <form onSubmit={handleSubmit} id='create-member-form'>
          <Stack spacing={2}>
            <InputLayout
              label='Username'
              required
              inputProps={{
                name: 'username',
                placeholder: '<Gen><Họ và tên viết tắt> VD: 11nvanh',
              }}
            />
            <InputLayout label='Họ và tên' required inputProps={{ name: 'fullName', placeholder: 'Nguyễn Văn Anh' }} />
            <Stack spacing={2} direction='row' sx={{ width: '100%' }}>
              <InputLayout label='Email' required inputProps={{ name: 'email', placeholder: 'nvananh@gmail.com' }} />
              <InputLayout label='Số điện thoại' inputProps={{ name: 'phone', placeholder: '0909123456' }} />
            </Stack>
            <Stack spacing={2} direction='row'>
              <InputLayout label='MSSV' inputProps={{ name: 'studentID', placeholder: '21120001' }} />
              <InputLayout label='Gen' required inputProps={{ name: 'gen', placeholder: '11' }} />
            </Stack>
            <InputLayout label='Trường' inputProps={{ name: 'school', placeholder: 'ĐH Khoa học tự nhiên' }} />
            <InputLayout label='Ngày sinh' direction='row' ratio={0.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  name='dob'
                  defaultValue={dayjs(new Date())}
                  views={['year', 'month', 'day']}
                  format='DD/MM/YYYY'
                />
              </LocalizationProvider>
            </InputLayout>
            <SelectDepartment />
            <SelectRole />
            <SelectPosition />
            <InputLayout
              label='Facebook'
              inputProps={{ name: 'facebook', type: 'url', placeholder: 'www.facebook.com/nvananh' }}
            />
          </Stack>
        </form>
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
