'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import color from '@/libs/ui/color';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: '20px',
});

export default function PaymentFailed() {
  const router = useRouter();

  const handleRetry = () => {
    router.push('/payment');
  };

  return (
    <Container maxWidth='sm'>
      <StyledBox>
        <Typography variant='h4' component='h1' color={color.notification.error} gutterBottom>
          Thanh toán thất bại
        </Typography>
        <Typography variant='body1'>Đơn thanh toán của bạn đã hết hạn hoặc bị huỷ bỏ.</Typography>
        <Button variant='contained' onClick={handleRetry}>
          Thử lại
        </Button>
      </StyledBox>
    </Container>
  );
}
