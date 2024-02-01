'use client';
import * as React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Box, Chip, Input, MenuItem, Stack, Typography, InputLabel, OutlinedInput } from '@mui/material';
import { TextFieldWithLabel as TextField, DropdownText, Uploader, colors } from '@/libs/ui';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


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
          <StyledInputHeader id='name' placeholder='Outr Space' required/>
          <TextField
            label='Khóa'
            inputProps={{
              placeholder: 'Khóa',
              required: true,
            }}></TextField>
            <Stack spacing={1}>
            <InputLabel id='leader-select-label' sx={{ width: '100%' }}>
              <Typography variant='subtitle2'>Ngày bắt đầu</Typography>
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker defaultValue={dayjs(new Date())}/>
            </LocalizationProvider>
          </Stack>
            
          <Stack direction='row'>
            <InputLabel id='leader-select-label' sx={{ width: '100%' }}>
              <Typography variant='subtitle2'>Trưởng Ban tổ chức</Typography>
            </InputLabel>
            <DropdownText
              labelId='leader-select-label'
              id='leader-select'
              renderValue={renderLeaderValue}
              fullWidth
              required>
              <MenuItem value='Võ Minh Anh Thư'>Võ Minh Anh Thư</MenuItem>
              <MenuItem value='Triệu Nhật Minh'>Triệu Nhật Minh</MenuItem>
              <MenuItem value='Võ Tuấn Tài'>Võ Tuấn Tài</MenuItem>
            </DropdownText>
          </Stack>
          <Stack direction='row'>
            <InputLabel id='leader-select-label' sx={{ width: '100%' }}>
              <Typography variant='subtitle2'>Loại sự kiện</Typography>
            </InputLabel>
            <DropdownText
              labelId='leader-select-label'
              id='leader-select'
              renderValue={renderTypeValue}
              fullWidth
              required>
              <MenuItem value='Cuộc thi'>Cuộc thi</MenuItem>
              <MenuItem value='Workshop'>Workshop</MenuItem>
            </DropdownText>
          </Stack>
          <TextField
            label='CTA link'
            inputProps={{
              placeholder: 'www.outrspace.com',
              type: 'url',
            }}></TextField>
        </Stack>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Uploader
            inputProps={{ onChange: handleUpload, accept: 'svg, png, jpg, jpeg, gif' }}
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
