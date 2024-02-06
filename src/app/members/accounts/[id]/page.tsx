'use client';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';

import { TextFieldWithLabel as TextField } from '@/libs/ui';
import members from '../members.json';
import IconButton from '@mui/material/IconButton';
import { FormHelperText } from '@mui/material';
import { useState } from 'react';

export default function MemberDetailsPage({ params }: { params: { id: string } }) {
  const [readOnly, setReadOnly] = useState(true); 
  const id = parseInt(params.id) - 1;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReadOnly(true);
  }
  return (
    <>
      <Stack direction="row" alignItems="baseline" justifyContent="space-between">
        <Typography variant='h6' fontWeight='600'>
          Thông tin tài khoản
        </Typography>
        <IconButton onClick={() => setReadOnly(!readOnly)}>
          <MoreIcon />
        </IconButton>
      </Stack>
      <Stack id="edit-info-member-frm" component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField
          label='Username'
          labelProps={{ sx: { width: '25%' } }}
          inputProps={{
            defaultValue: members[id].username,
            readOnly: readOnly,
            disabled: true,
            sx: { width: '75%' },
          }}
          containerProps={{ direction: "row", alignItems: "baseline" }}
        />
        <TextField
          label='Họ và tên'
          labelProps={{ sx: { width: '25%' } }}
          inputProps={{
            defaultValue: members[id].name,
            readOnly: readOnly,
            disabled: true,
            sx: { width: '75%' },
          }}
          containerProps={{ direction: "row", alignItems: "baseline" }}
        />
        <TextField
          label='Số điện thoại'
          labelProps={{ sx: { width: '25%' } }}
          inputProps={{
            defaultValue: members[id].profile?.phone,
            readOnly: readOnly,
            sx: { width: '75%' },
          }}
          containerProps={{ direction: "row", alignItems: "baseline" }}
        />
        <TextField
          label='Email'
          labelProps={{ sx: { width: '25%' } }}
          inputProps={{
            defaultValue: members[id].email,
            readOnly: readOnly,
            disabled: true,
            sx: { width: '75%' },
          }}
          containerProps={{ direction: "row", alignItems: "baseline" }}
        />
        <TextField
          label='MSSV'
          labelProps={{ sx: { width: '25%' } }}
          inputProps={{
            defaultValue: members[id].profile?.studentId,
            readOnly: readOnly,
            sx: { width: '75%' },
          }}
          containerProps={{ direction: "row", alignItems: "baseline" }}
        />
        <TextField
          label='Gen'
          labelProps={{ sx: { width: '25%' } }}
          inputProps={{
            defaultValue: members[id].profile?.gen,
            readOnly: readOnly,
            sx: { width: '75%' },
          }}
          containerProps={{ direction: "row", alignItems: "baseline" }}
        />
        <Stack spacing={1} direction="row" alignItems="baseline">
          <InputLabel id='leader-select-label' sx={{ width: '25%' }}>
            <Typography variant='subtitle2'>Ngày sinh</Typography>
          </InputLabel>
          <Stack sx={{width: "75%"}}>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
              defaultValue={dayjs( new Date(members[id].profile?.dob as string))} 
              readOnly
              views={["year", "month", "day"]}/>
          </LocalizationProvider>
          </Stack>
        </Stack>
        <TextField
          label='Facebook'
          labelProps={{ sx: { width: '25%' } }}
          inputProps={{
            defaultValue: members[id].profile?.facebook,
            readOnly: readOnly,
            sx: { width: '75%' },
            color: 'error',
          }}
          containerProps={{ direction: "row", alignItems: "baseline" }}
        />
        {!readOnly && <Button disabled={readOnly} sx={{width: "fit-content"}} type="submit">Lưu</Button>}
      </Stack>
      <Typography variant='h6' fontWeight='600'>
        Sự kiện tham gia
      </Typography>
    </>
  );
}
