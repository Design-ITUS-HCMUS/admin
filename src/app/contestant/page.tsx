'use client';
import React from 'react';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';

export default function Contestant() {
  return (
    <div>
      <Stack direction='column' spacing={2} alignItems='center'>
        <h1>Contestant</h1>
        <Button component={Link} href='/contestant/submission'>
          Đến trang nộp bài
        </Button>
        <Button component={Link} href='/contestant/team-management'>
          Đến trang quản lý đội
        </Button>
        <Button component={Link} href='/payment'>
          Đến trang thanh toán
        </Button>
      </Stack>
    </div>
  );
}
