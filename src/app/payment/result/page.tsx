'use client';

import Image from 'next/legacy/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { styled, Typography } from '@mui/material';

import { MyButton } from '@/libs/ui';
import color from '@/libs/ui/color';
import Loading from '@/app/loading';
import transactionCompleted from '@/assets/transactionCompleted.gif';

// query string:
// ?code=00&id=2e4acf1083304877bf1a8c108b30cccd&cancel=true&status=CANCELLED&orderCode=803347

const Paper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  padding: '20px',
  marginTop: '50px',
  maxWidth: '500px',
  margin: 'auto',
});

const getStyledComponents = (color: string, bgColor: string, hoverColor: string) => {
  const StyledTypography = styled(Typography)({ color });
  const StyledButton = styled(MyButton)({
    backgroundColor: bgColor,
    '&:hover': {
      backgroundColor: hoverColor,
    },
  });

  return { StyledTypography, StyledButton };
};

const { StyledTypography: SuccessText, StyledButton: SuccessButton } = getStyledComponents(
  color.notification.success,
  color.notification.success,
  'darkgreen'
);
const { StyledTypography: ErrorText, StyledButton: ErrorButton } = getStyledComponents(
  color.notification.error,
  color.notification.error,
  'darkred'
);

const translateStatus = (status: any) => {
  status = status.toLowerCase();
  const statusTranslations: { [key: string]: string } = {
    paid: 'đã thanh toán',
    pending: 'đang chờ thanh toán',
    processing: 'đang xử lý',
    cancelled: 'đã hủy',
  };

  return statusTranslations[status] || '';
};

export default function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Đang xử lý giao dịch...');
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const searchParams = useSearchParams();

  const cancel = searchParams.get('cancel');
  const orderCode = searchParams.get('orderCode');
  const status = searchParams.get('status');

  return (
    <>
      {loading ? (
        <Loading loadingMessage={loadingMessage} />
      ) : cancel === 'true' || status === 'CANCELLED' ? (
        <Paper>
          <ErrorText variant='h4' gutterBottom>
            Đã hủy giao dịch!
          </ErrorText>
          <ErrorButton variant='contained' onClick={() => router.push('/payment')}>
            Trở lại trang thanh toán
          </ErrorButton>
        </Paper>
      ) : (
        <Paper>
          <Image
            src={transactionCompleted}
            alt='Giao dịch thành công'
            priority
            width={300}
            height={300}
            objectFit='contain'
          />{' '}
          <SuccessText variant='h4' gutterBottom>
            Đơn hàng {typeof status === 'string' ? `${translateStatus(status)}` : ''}!
          </SuccessText>
          <Typography variant='h6'>Mã đơn hàng: {orderCode}</Typography>
          <SuccessButton variant='contained' onClick={() => router.push('/payment')}>
            Trở lại trang thanh toán
          </SuccessButton>
        </Paper>
      )}
    </>
  );
}
