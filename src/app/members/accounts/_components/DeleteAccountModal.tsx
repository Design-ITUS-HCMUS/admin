'use client';
import { usePathname, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { LoadingButton } from '@/libs/ui';
import { useUsers } from '@/libs/queryClient/users';
import { useToast } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  const router = useRouter();
  const pathname = usePathname();
  const { deleteUser } = useUsers();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    mutationKey: ['users', 'deleteUser', userID],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'], refetchType: 'all' });
      queryClient.removeQueries({ queryKey: ['users', userID.toString()], exact: true });
    },
  });

  const handleDelete = () => {
    mutate(userID, {
      onSuccess: () => {
        if (pathname !== '/members/accounts') router.push('/members/accounts');
        toast.setAlert({
          alert: 'success',
          message: {
            title: 'Xóa thành viên thành công',
            description: 'Vui lòng chờ trong giây lát để cập nhật dữ liệu',
          },
        });
        handleClose();
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
      onSettled: () => {
        toast.setOpen();
      },
    });
  };
  return (
    <Dialog {...props} onClick={handleClose} maxWidth='xs' PaperProps={{ variant: 'section' }}>
      <DialogTitle>Xóa thành viên</DialogTitle>
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
