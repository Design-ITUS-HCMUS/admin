'use client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { useToast } from '@/hooks';
import { useUsers } from '@/libs/query';
import { LoadingButton } from '@/libs/ui';

export function DeleteAccountModal({
  fullName,
  userID,
  handleClose,
  ...props
}: {
  fullName: string;
  userID: number;
  handleClose: () => void;
} & DialogProps) {
  const toast = useToast();
  const { deleteUser } = useUsers();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    mutationKey: ['users', 'deleteUser', userID],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'], refetchType: 'all' });
    },
    onError: (error) => {
      toast.setAlert({
        alert: 'error',
        message: {
          title: 'Xóa thành viên thất bại',
          description: error.message,
        },
      });
    },
  });

  const handleDelete = () => {
    mutate(userID, {
      onSuccess: () => {
        toast.setAlert({
          alert: 'success',
          message: {
            title: 'Xóa thành viên thành công',
            description: 'Vui lòng chờ trong giây lát để cập nhật dữ liệu',
          },
        });
        handleClose();
        router.prefetch('/members/accounts');
        router.replace('/members/accounts');
      },
      onSettled: () => {
        toast.setOpen();
      },
    });
  };

  return (
    <Dialog {...props} onClick={handleClose} maxWidth='xs' PaperProps={{ variant: 'section' }}>
      <DialogTitle fontWeight='bold' variant='h6'>
        Xóa thành viên
      </DialogTitle>
      <DialogContent>
        <Typography>
          Thao tác này không thể khôi phục được, bạn có chắc chắn muốn xóa thành viên{' '}
          {typeof fullName === 'string' ? (
            <Typography component='span' fontWeight='bold'>
              {fullName}?
            </Typography>
          ) : (
            <Box sx={{ width: '100%', mt: 1, textAlign: 'center' }}>{fullName}</Box>
          )}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button disabled={status === 'pending'} variant='text' onClick={handleClose}>
          Hủy
        </Button>
        <LoadingButton loading={status === 'pending'} color='error' onClick={handleDelete}>
          Xóa
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
