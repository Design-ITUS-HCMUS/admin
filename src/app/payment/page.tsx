'use client';

import { lazy, useEffect, Suspense, useState, FC, Dispatch, SetStateAction, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, styled } from '@mui/material';
import { colors } from '@/libs/ui';
import { MyDialog } from '@/libs/ui/components/Dialog';
import { TextFieldWithLabel } from '@/libs/ui';

const Loading = lazy(() => import('@/app/payment/loading'));

const API_ENDPOINT = '/api/payment/payos/payment-requests';
const ERROR_MESSAGE = 'Có lỗi xảy ra khi tạo link thanh toán';

type FormComponentProps = {
  buyerID: string;
  setBuyerID: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  errorDialogOpen: boolean;
  setErrorDialogOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  loadingMessage: string;
};

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: '16px',
});

const StyledErrButton = styled(Button)({
  backgroundColor: colors.notification.error,
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

async function createPaymentLink(buyerID: number) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ buyerID }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }

  const data = await response.json();
  return data.data.checkoutUrl;
}

function FormComponent({
  buyerID,
  setBuyerID,
  handleSubmit,
  errorDialogOpen,
  setErrorDialogOpen,
  loading,
  loadingMessage,
}: FormComponentProps) {
  return (
    <Container maxWidth='sm'>
      {loading && <Loading loadingMessage={loadingMessage} />}
      <StyledForm onSubmit={handleSubmit}>
        <TextFieldWithLabel
          label='Buyer ID'
          inputProps={{
            placeholder: 'Buyer ID chỉ được phép là số',
            value: buyerID,
            error: buyerID.length > 0 && (isNaN(Number(buyerID)) || Number(buyerID) <= 0),
            onChange: (e) => setBuyerID(e.target.value),
          }}
          containerStyle={{
            marginTop: '16px',
          }}
        />
        <Button variant='contained' type='submit'>
          Đến trang thanh toán PayOS
        </Button>
      </StyledForm>
      <MyDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        title='Lỗi'
        content='Buyer ID chỉ được phép là số'
        titleStyle={{ color: colors.notification.error }}
        contentStyle={{ color: colors.notification.error }}
        actions={<StyledErrButton onClick={() => setErrorDialogOpen(false)}>OK</StyledErrButton>}
      />
    </Container>
  );
}

export default function Payment() {
  const [buyerID, setBuyerID] = useState<string>('');
  const [paymentLink, setPaymentLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedBuyerID = Number(buyerID);
    if (isNaN(parsedBuyerID) || parsedBuyerID <= 0) {
      setErrorDialogOpen(true);
      return;
    }
    setErrorDialogOpen(false);
    setLoadingMessage('Đang tạo link thanh toán...');
    setLoading(true);
    try {
      const checkoutUrl = await createPaymentLink(parsedBuyerID);
      setPaymentLink(checkoutUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentLink) {
      router.push(paymentLink);
    }
  }, [paymentLink]);

  return (
    <Suspense fallback={<Loading loadingMessage='Đang tải...' />}>
      <FormComponent
        buyerID={buyerID}
        setBuyerID={setBuyerID}
        handleSubmit={handleSubmit}
        errorDialogOpen={errorDialogOpen}
        setErrorDialogOpen={setErrorDialogOpen}
        loading={loading}
        loadingMessage={loadingMessage}
      />
    </Suspense>
  );
}
