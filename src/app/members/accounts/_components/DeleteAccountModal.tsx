import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { LoadingButton } from '@/libs/ui';
import { useToast } from '@/hooks';

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { setAlert, setOpen } = useToast();

  const handleDelete = () => {
    setLoading(true);
    fetch('/api/user/users-remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: [userID] }),
    })
      .then((res) => res.json())
      .then((res) => {
        const { success, data } = res;
        if (!success || data.count === 0) {
          throw new Error(res.message);
        }
        setAlert({
          alert: 'success',
          message: {
            title: 'Xóa thành viên thành công',
            description: 'Vui lòng chờ một chút để cập nhật dữ liệu',
          },
        });
        setOpen();
        if (pathname === '/members/accounts') {
          window.location.reload();
        } else router.push('/members/accounts');
      })
      .catch((e) => {
        setAlert({
          alert: 'error',
          message: {
            title: 'Xóa thành viên thất bại',
            description: e.message,
          },
        });
        setOpen();
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
        handleClose();
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
        <Button disabled={loading} variant='text' onClick={handleClose}>
          Hủy
        </Button>
        <LoadingButton loading={loading} color='error' onClick={handleDelete}>
          Xóa
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
