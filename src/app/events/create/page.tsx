'use client';
import * as React from 'react';
import Image from 'next/image';
import { Box, Button, Grid, Input, Stack, MenuItem, Typography, InputLabel } from '@mui/material';
import { TextFieldWithLabel as TextField, DropdownWithLabel, DropdownText, Uploader, colors } from '@/libs/ui';

export default function Page() {
  const [preview, setPreview] = React.useState<File | null>(null);
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      setPreview(files[0]);
      return;
    }
  };

  const renderLeaderValue = (value: any) => {
    if (value) return <Typography>{value}</Typography>;
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn 1 thành viên
      </Typography>
    );
  };

  const renderTypeValue = (value: any) => {
    if (value) return <Typography>{value}</Typography>;
    return (
      <Typography color={colors.neutral[200]} fontWeight='regular'>
        Chọn 1 loại sự kiện
      </Typography>
    );
  };

  return (
    <Grid container columns={8} spacing={2} mt={{ xs: 0, md: 4 }}>
      <Grid item xs={0} md={1} />
      <Grid item xs={6}>
        <Typography variant='h6' fontWeight='bold' mb={2}>
          Tạo sự kiện
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Input placeholder='Outr Space' />
              <TextField
                label='Khóa'
                inputProps={{
                  placeholder: 'Khóa',
                }}></TextField>
              <TextField
                label='Ngày bắt đầu'
                inputProps={{
                  placeholder: 'Khóa',
                  type: 'date',
                }}></TextField>
              <Stack direction='row'>
                <InputLabel id='leader-select-label' sx={{width: "100%"}}>
                  <Typography variant='subtitle2'>Trưởng Ban tổ chức</Typography>
                </InputLabel>
                <DropdownText
                  labelId='leader-select-label'
                  id='leader-select'
                  variant='standard'
                  renderValue={renderLeaderValue}
                  fullWidth
                  displayEmpty>
                  <MenuItem value="Võ Minh Anh Thư">Võ Minh Anh Thư</MenuItem>
                  <MenuItem value="Triệu Nhật Minh">Triệu Nhật Minh</MenuItem>
                  <MenuItem value="Võ Tuấn Tài">Võ Tuấn Tài</MenuItem>
                </DropdownText>
              </Stack>
              <Stack direction='row'>
                <InputLabel id='leader-select-label' sx={{width: "100%"}}>
                  <Typography variant='subtitle2'>Loại sự kiện</Typography>
                </InputLabel>
                <DropdownText
                  labelId='leader-select-label'
                  id='leader-select'
                  variant='standard'
                  renderValue={renderTypeValue}
                  fullWidth
                  displayEmpty>
                  <MenuItem value="Cuộc thi">Cuộc thi</MenuItem>
                  <MenuItem value="Workshop">Workshop</MenuItem>
                </DropdownText>
              </Stack>
              <TextField
                label='CTA link'
                inputProps={{
                  placeholder: 'www.outrspace.com',
                  type: 'url',
                }}></TextField>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Uploader inputProps={{ onChange: handleUpload }} />
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
          </Grid>
        </Grid>
        <Stack direction='row' spacing={2} justifyContent='flex-end' mt={2}>
          <Button variant='text' color='primary' size='medium'>
            Cancel
          </Button>
          <Button size='medium'>Tạo sự kiện</Button>
        </Stack>
      </Grid>
      <Grid item xs={0} md={1} />
    </Grid>
  );
}
