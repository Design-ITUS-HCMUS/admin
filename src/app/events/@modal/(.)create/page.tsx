'use client';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Grid, Input } from '@mui/material';
import { TextFieldWithLabel as TextField } from '@/libs/ui/components';

export default function Page() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <Dialog open={true} onClose={handleClose} maxWidth='md' fullWidth PaperProps={{ variant: 'section' }}>
      <DialogTitle id='alert-dialog-title' fontWeight={'bold'}>
        Tạo sự kiện
      </DialogTitle>
      <DialogContent id='alert-dialog-description'>
        <Grid container>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='text'>
          Cancel
        </Button>
        <Button onClick={handleClose}>Tạo sự kiện</Button>
      </DialogActions>
    </Dialog>
  );
}
