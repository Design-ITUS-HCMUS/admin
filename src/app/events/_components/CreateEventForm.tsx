'use client';
import * as React from 'react';
import Image from 'next/image';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors, DropdownText, InputLayout, Uploader } from '@/libs/ui';

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
  /**The callback function to be executed when the form is submitted.*/
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

  const renderTypeValue = (value: any) => {
    if (value) return <Chip label={<Typography>{value}</Typography>} size='small' />;
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn loại sự kiện
      </Typography>
    );
  };

  return (
    <form onSubmit={handleSubmit} id='create-event-form'>
      <Stack spacing={2} direction='row'>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <StyledInputHeader id='name' placeholder='Outr Space' required />
          <InputLayout label='Khóa' required inputProps={{ name: 'key', placeholder: 'Khóa', required: true }} />
          <InputLayout label='Ngày bắt đầu'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker defaultValue={dayjs(new Date())} name='startDate' format='DD/MM/YYYY hh:mm A' />
            </LocalizationProvider>
          </InputLayout>
          <InputLayout label='Loại sự kiện' required direction='row' ratio={0.5}>
            <DropdownText name='type' id='type-select' renderValue={renderTypeValue} required>
              <MenuItem key='contest' value='Cuộc thi'>
                Cuộc thi
              </MenuItem>
              <MenuItem key='workshop' value='Workshop'>
                Workshop
              </MenuItem>
            </DropdownText>
          </InputLayout>
          <InputLayout
            label='CTA link'
            inputProps={{ name: 'link', type: 'url', placeholder: 'www.facebook.com/outrspace' }}
          />
        </Stack>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Uploader
            inputProps={{ onChange: handleUpload, accept: 'svg, png, jpg, jpeg, gif', name: 'thumbnail' }}
            placeholder='SVG, PNG, JPG or GIF (1400x700px)'
          />
          <Box position='relative' sx={{ width: '100%', aspectRatio: 2 }}>
            {!!preview && (
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
