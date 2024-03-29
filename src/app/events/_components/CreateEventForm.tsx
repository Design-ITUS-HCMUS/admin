'use client';
import * as React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { InputLayout, DropdownText, Uploader, colors } from '@/libs/ui';

const StyledInputHeader = styled(Input)({
  fontSize: '34px',
  fontWeight: 700,
  '::before': {
    borderBottom: 'none',
  },
  ':hover:not(.Mui-disabled, .Mui-error):before': {
    borderBottom: 'none',
  },
});

interface CreateEventFormProps {
  onSubmit: (formData: FormData) => void;
}

export function CreateEventForm(props: CreateEventFormProps) {
  const { onSubmit } = props;
  const [preview, setPreview] = React.useState<File | null>(null);
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      setPreview(files[0]);
      return;
    }
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(new FormData(event.currentTarget));
  }

  const renderLeaderValue = (value: any) => {
    if (value) return <Typography>{value}</Typography>;
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn thành viên
      </Typography>
    );
  };

  const renderTypeValue = (value: any) => {
    if (value) return <Chip label={<Typography>{value}</Typography>} size='small' />;
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn loại sự kiện
      </Typography>
    );
  };
  return (
    <form onSubmit={handleSubmit} method='post' id='create-event-form'>
      <Stack spacing={2} direction='row'>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <StyledInputHeader id='name' placeholder='Outr Space' required />
          <InputLayout name='key' label='Khóa' inputprops={{ placeholder: 'Khóa', required: true }} />
          <InputLayout name='startDate' label='Ngày bắt đầu'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker defaultValue={dayjs(new Date())} format='DD/MM/YYYY hh:mm A' />
            </LocalizationProvider>
          </InputLayout>
          <InputLayout name='leader' label='Trưởng BTC' direction='row' ratio={0.5} inputprops={{ required: true }}>
            <DropdownText labelId='leader-select-label' id='leader-select' renderValue={renderLeaderValue} required>
              <MenuItem value='Võ Minh Anh Thư'>Võ Minh Anh Thư</MenuItem>
              <MenuItem value='Triệu Nhật Minh'>Triệu Nhật Minh</MenuItem>
              <MenuItem value='Võ Tuấn Tài'>Võ Tuấn Tài</MenuItem>
            </DropdownText>
          </InputLayout>
          <InputLayout name='type' label='Loại sự kiện' direction='row' ratio={0.5} inputprops={{ required: true }}>
            <DropdownText labelId='leader-select-label' id='leader-select' renderValue={renderTypeValue} required>
              <MenuItem value='Cuộc thi'>Cuộc thi</MenuItem>
              <MenuItem value='Workshop'>Workshop</MenuItem>
            </DropdownText>
          </InputLayout>
          <InputLayout
            name='facebook'
            label='Facebook'
            inputprops={{ type: 'url', placeholder: 'www.facebook.com/outrspace' }}
          />
        </Stack>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Uploader
            inputProps={{ onChange: handleUpload, accept: 'svg, png, jpg, jpeg, gif', name: 'thumbnail' }}
            placeholder='SVG, PNG, JPG or GIF (1400x700px)'
          />
          <Box position='relative' sx={{ width: '100%', aspectRatio: 2 }}>
            {preview && (
              <Image
                src={URL.createObjectURL(preview)}
                fill
                alt={preview.name}
                objectFit='cover'
                style={{ borderRadius: '4px' }}
              />
            )}
          </Box>
        </Stack>
      </Stack>
    </form>
  );
}
