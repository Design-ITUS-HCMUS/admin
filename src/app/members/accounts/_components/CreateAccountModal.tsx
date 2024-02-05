'use client';
import * as React from 'react';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { TextFieldWithLabel as TextField } from '@/libs/ui';
import { SelectDepartment, SelectRole, SelectPosition } from './SelectInput';

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
        <form onSubmit={handleSubmit} method='post' id='create-member-form'>
          <Stack spacing={2}>
            <TextField
              label='Username'
              labelProps={{ required: true }}
              inputProps={{ placeholder: '<Gen><Họ và tên viết tắt> VD: 11nvanh' }}
            />
            <TextField
              label='Họ và tên'
              labelProps={{ required: true }}
              inputProps={{ placeholder: 'Nguyễn Văn Anh' }}
            />
            <Stack spacing={2} direction='row' sx={{ width: '100%' }}>
              <TextField
                label='Email'
                containerStyle={{ width: '100%' }}
                inputProps={{ placeholder: 'nvananh@gmail.com' }}
              />
              <TextField
                label='Số điện thoại'
                containerStyle={{ width: '100%' }}
                inputProps={{ placeholder: '0909123456' }}
              />
            </Stack>
            <Stack spacing={2} direction='row'>
              <TextField label='MSSV' containerStyle={{ width: '100%' }} inputProps={{ placeholder: '21120001' }} />
              <TextField
                label='Gen'
                labelProps={{ required: true }}
                containerStyle={{ width: '100%' }}
                inputProps={{ placeholder: '11' }}
              />
            </Stack>
            <TextField
              label='Trường'
              containerStyle={{ width: '100%' }}
              inputProps={{ placeholder: 'ĐH Khoa học tự nhiên' }}
            />
            <Stack spacing={1}>
              <InputLabel id='leader-select-label' sx={{ width: '100%' }}>
                <Typography variant='subtitle2'>Ngày sinh</Typography>
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker defaultValue={dayjs(new Date())} />
              </LocalizationProvider>
            </Stack>
            <SelectDepartment />
            <SelectRole />
            <SelectPosition />
            <TextField label='Facebook' inputProps={{ type: 'url', placeholder: 'www.facebook.com/nvananh' }} />
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
