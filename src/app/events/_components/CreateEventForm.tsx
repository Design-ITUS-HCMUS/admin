'use client';
import * as React from 'react';
import { Formik, Form } from 'formik';
import Image from 'next/image';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { useMutation } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors, DropdownText, InputLayout, Uploader } from '@/libs/ui';
import { Event } from '@/libs/models';
import { useUsers } from '@/libs/query';
import { useToast } from '@/hooks';
import { uploadFile } from '@/utils/fileHelper';

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
  /** To block submit when uploading file */
  setBlockSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const data: Event = {
  name: '',
  key: '',
  start: new Date(),
  tag: [],
  thumbnail: -1,
  description: '',
};

export function CreateEventForm({ setBlockSubmit }: CreateEventFormProps) {
  const [preview, setPreview] = React.useState('');
  const { setAlert, setOpen } = useToast();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      setPreview(URL.createObjectURL(files[0]));

      try {
        const id = (await uploadFile(files))[0];
        data.thumbnail = id;
        setBlockSubmit(false);
        setAlert({
          alert: 'success',
          message: {
            title: 'Tải ảnh thành công',
          },
        });
        setOpen();
      } catch (error) {
        console.error(error);
        setBlockSubmit(true);
        setAlert({
          alert: 'error',
          message: {
            title: 'Lỗi tải ảnh',
            description: 'Vui lòng reload lại trang và thử lại.',
          },
        });
        setOpen();
      }

      return;
    }
  };

  const mutation = useMutation({
    mutationFn: useUsers().createEvent,
    onSuccess: () => {
      setAlert({
        alert: 'success',
        message: {
          title: 'Tạo sự kiện thành công',
        },
      });
      setOpen();
      window.history.pushState({}, '', '/events' + data.key);
    },
  });

  const renderTypeValue = (value: unknown) => {
    if (Array.isArray(value) && value.length > 0) {
      const rename = value.map((val) => (val === 'Contest' ? 'Cuộc thi' : 'Workshop'));
      return rename.map((val) => <Chip key={val} label={<Typography>{val}</Typography>} size='small' />);
    }
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn loại sự kiện
      </Typography>
    );
  };

  return (
    <>
      <Formik initialValues={data} onSubmit={(values) => mutation.mutate(values)}>
        {({ values, handleChange }) => (
          <Form id='create-event-form'>
            <Stack spacing={2} direction='row'>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <StyledInputHeader
                  placeholder='Outr Space'
                  required
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                />
                <InputLayout
                  label='Khóa'
                  required
                  formik
                  inputProps={{ name: 'key', placeholder: 'Khóa', required: true }}
                />
                <InputLayout label='Ngày bắt đầu' formik>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                    <DateTimePicker defaultValue={dayjs(new Date())} name='start' />
                  </LocalizationProvider>
                </InputLayout>
                <InputLayout label='Loại sự kiện' required direction='row' ratio={0.5}>
                  <DropdownText
                    name='tag'
                    renderValue={renderTypeValue}
                    required
                    value={values.tag}
                    multiple
                    displayEmpty
                    onChange={handleChange}>
                    <MenuItem value='Contest'>Cuộc thi</MenuItem>
                    <MenuItem value='Workshop'>Workshop</MenuItem>
                  </DropdownText>
                </InputLayout>
                <InputLayout
                  label='Description'
                  required
                  inputProps={{
                    name: 'description',
                    type: 'text',
                    placeholder: "9th-time annual Design ITUS traditional's competition",
                    required: true,
                  }}
                  formik
                />
              </Stack>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Uploader
                  inputProps={{ onChange: handleUpload, accept: '.svg, .png, .jpg, .jpeg, .gif', name: 'thumbnail' }}
                  placeholder='SVG, PNG, JPG or GIF (1400x700px)'
                />
                <Box position='relative' sx={{ width: '100%', aspectRatio: 2 }}>
                  {!!preview && (
                    <Image
                      src={preview}
                      fill
                      alt={'Event Thumbnail'}
                      style={{ borderRadius: '4px', objectFit: 'cover' }}
                    />
                  )}
                </Box>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}
