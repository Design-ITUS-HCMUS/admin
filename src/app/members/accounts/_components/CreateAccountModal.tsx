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
import { SelectDepartment, SelectPosition,SelectRole } from './CustomSelect';

interface CreateAccountModalProps {
  open: boolean;
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
              name='username'
              label='Username'
              inputprops={{
                placeholder: '<Gen><Họ và tên viết tắt> VD: 11nvanh',
                required: true,
              }}
            />
            <InputLayout
              name='fullName'
              label='Họ và tên'
              inputprops={{ placeholder: 'Nguyễn Văn Anh', required: true }}
            />
            <Stack spacing={2} direction='row' sx={{ width: '100%' }}>
              <InputLayout
                name='email'
                label='Email'
                inputprops={{ placeholder: 'nvananh@gmail.com', required: true }}
              />
              <InputLayout name='phone' label='Số điện thoại' inputprops={{ placeholder: '0909123456' }} />
            </Stack>
            <Stack spacing={2} direction='row'>
              <InputLayout name='studentId' label='MSSV' inputprops={{ placeholder: '21120001' }} />
              <InputLayout name='gen' label='Gen' inputprops={{ placeholder: '11' }} />
            </Stack>
            <InputLayout name='school' label='Trường' inputprops={{ placeholder: 'ĐH Khoa học tự nhiên' }} />
            <InputLayout name='dob' label='Ngày sinh' direction='row' ratio={0.5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker defaultValue={dayjs(new Date())} views={['year', 'month', 'day']} format='DD/MM/YYYY' />
              </LocalizationProvider>
            </InputLayout>
            <SelectDepartment />
            <SelectRole />
            <SelectPosition />
            <InputLayout
              name='facebook'
              label='Facebook'
              inputprops={{ type: 'url', placeholder: 'www.facebook.com/nvananh' }}
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
