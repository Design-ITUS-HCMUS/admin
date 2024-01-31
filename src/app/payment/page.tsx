'use client';

import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Box } from '@mui/material';
import { TextFieldWithLabel } from '@/libs/ui';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    mt: 8,
  },
};

export default function Payment() {
  const [buyerID, setBuyerID] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const parsedBuyerID = Number(buyerID);

    if (isNaN(parsedBuyerID) || parsedBuyerID <= 0) {
      alert('Buyer ID chỉ được phép là số');
      return;
    }

    const response = await fetch('/api/payment/payos/payment-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        buyerID: parsedBuyerID,
      }),
    });

    const data = await response.json();
    setPaymentLink(data.paymentLink);

    // Display return data
    alert(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  }, [paymentLink]);

  return (
    <Container maxWidth='sm'>
      <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
        <TextField
          label='Buyer ID'
          placeholder='Buyer ID only accept number'
          multiline
          variant='standard'
          value={buyerID}
          onChange={(e) => setBuyerID(e.target.value)}
        />
        <Button variant='contained' type='submit'>
          Đến trang thanh toán PayOS
        </Button>
      </Box>
    </Container>
  );
}
