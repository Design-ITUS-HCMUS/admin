'use client';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { CreateEventForm } from '../../_components';

export default function Page() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  function handleSubmit(_formData: FormData) {}

  return (
    <Dialog open={true} onClose={handleClose} maxWidth='md' fullWidth PaperProps={{ variant: 'section' }}>
      <DialogTitle id='alert-dialog-title' fontWeight={'bold'}>
        Tạo sự kiện
      </DialogTitle>
      <DialogContent id='alert-dialog-description'>
        <CreateEventForm onSubmit={handleSubmit} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='text'>
          Cancel
        </Button>
        <Button form='create-event-form' type='submit'>
          Tạo sự kiện
        </Button>
      </DialogActions>
    </Dialog>
  );
}
