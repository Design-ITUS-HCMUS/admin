'use client';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { CreateEventForm } from '../../_components';

export default function EventCreateModal() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  function handleSubmit(formData: FormData) {}

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
