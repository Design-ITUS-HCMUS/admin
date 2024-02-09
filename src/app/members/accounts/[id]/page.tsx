'use client';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MoreIcon from '@mui/icons-material/MoreHorizRounded';

import { InputLayout } from '@/libs/ui';
import { SelectDepartment, SelectPosition, SelectRole } from '../_components';
import members from '../members.json';

export default function MemberDetailsPage({ params }: { params: { id: string } }) {
  const [readOnly, setReadOnly] = useState(true);
  const id = parseInt(params.id) - 1;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReadOnly(true);
  };
  return (
    <>
      <Stack direction='row' alignItems='baseline' justifyContent='space-between'>
        <Typography variant='h6' fontWeight='600'>
          Thông tin tài khoản
        </Typography>
        <IconButton onClick={() => setReadOnly(!readOnly)}>
          <MoreIcon />
        </IconButton>
      </Stack>
      <Stack id='edit-info-member-frm' component='form' spacing={2} onSubmit={handleSubmit}>
        <InputLayout
          label='Username'
          direction='row'
          ratio={0.25}
          inputprops={{
            defaultValue: members[id].username,
            readOnly: readOnly,
            disabled: true,
          }}
        />
        <InputLayout
          label='Họ và tên'
          direction='row'
          ratio={0.25}
          inputprops={{
            defaultValue: members[id].name,
            readOnly: readOnly,
            disabled: true,
          }}
        />
        <InputLayout
          name='phone'
          label='Số điện thoại'
          direction='row'
          ratio={0.25}
          inputprops={{
            defaultValue: members[id].profile?.phone,
            readOnly: readOnly,
          }}
        />
        <InputLayout
          label='Email'
          direction='row'
          ratio={0.25}
          inputprops={{
            defaultValue: members[id].email,
            readOnly: readOnly,
            disabled: true,
          }}
        />
        <InputLayout
          name='studentId'
          label='MSSV'
          direction='row'
          ratio={0.25}
          inputprops={{
            defaultValue: members[id].profile?.studentId,
            readOnly: readOnly,
          }}
        />
        <InputLayout
          name='gen'
          label='Gen'
          direction='row'
          ratio={0.25}
          inputprops={{
            defaultValue: members[id].profile?.gen,
            readOnly: readOnly,
          }}
        />
        <InputLayout name='dob' label='Ngày sinh' direction='row' ratio={0.25}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              defaultValue={dayjs(new Date(members[id].profile?.dob as string))}
              readOnly={readOnly}
              views={['year', 'month', 'day']}
              format='DD/MM/YYYY'
            />
          </LocalizationProvider>
        </InputLayout>
        <SelectDepartment ratio={0.25} defaultValue={members[id].profile?.departments} readOnly={readOnly} />
        <SelectPosition ratio={0.25} defaultValue={members[id].profile?.position} readOnly={readOnly} />
        <SelectRole ratio={0.25} defaultValue={members[id].role} readOnly={readOnly} />
        <InputLayout
          name='facebook'
          label='Facebook'
          direction='row'
          ratio={0.25}
          inputprops={{
            defaultValue: members[id].profile?.facebook,
            readOnly: readOnly,
          }}
        />
        {!readOnly && (
          <Button disabled={readOnly} sx={{ width: 'fit-content' }} type='submit'>
            Lưu
          </Button>
        )}
      </Stack>
      <Typography variant='h6' fontWeight='600'>
        Sự kiện tham gia
      </Typography>
    </>
  );
}
