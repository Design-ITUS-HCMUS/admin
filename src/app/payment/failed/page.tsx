'use client';

import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Button } from '@mui/material';
import color from '@/libs/ui/color';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '20px',
  },
};

export default function PaymentFailed() {
  const router = useRouter();

  const handleRetry = () => {
    router.push('/payment');
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={styles.box}>
        <Typography variant='h4' component='h1' color={color.notification.error} gutterBottom>
          Thanh toán thất bại
        </Typography>
        <Typography variant='body1'>Đơn thanh toán của bạn đã hết hạn hoặc bị huỷ bỏ.</Typography>
        <Button variant='contained' onClick={handleRetry}>
          Thử lại
        </Button>
      </Box>
    </Container>
  );
}
