'use client';
import * as React from 'react';
import { Button, Typography, Grid, Input, Stack } from '@mui/material';
import { TextFieldWithLabel as TextField, Uploader } from '@/libs/ui';
export default function Page() {
  const [preview, setPreview] = React.useState<string>('No file uploaded');
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
      if (files) {
        setPreview(`${files.length} file(s) uploaded`);
        return
      }
      setPreview('No file uploaded')
      
  };
  return (
    <Grid container columns={8} spacing={2} mt={{xs: 0, md: 4}}>
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
              <TextField
                label='CTA link'
                inputProps={{
                  placeholder: 'www.outrspace.com',
                  type: 'url',
                }}></TextField>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Uploader inputProps={{ onChange: handleUpload}} />
            <Typography>{preview}</Typography>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button variant='text' color='primary' size="medium">Cancel</Button>
          <Button size="medium">Tạo sự kiện</Button>
        </Stack>
      </Grid>
      <Grid item xs={0} md={1} />
    </Grid>
  );
}
