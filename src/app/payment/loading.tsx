'use client';

import { CircularProgress, Box, Typography } from '@mui/material';
import color from '@/libs/ui/color';
import { MyDialog } from '@/libs/ui/components/Dialog';

type LoadingProps = {
  loadingMessage: string;
};

export default function Loading({ loadingMessage }: LoadingProps) {
  return (
    <MyDialog
      open={true}
      content={
        <Box display='flex' alignItems='center' gap={2}>
          <CircularProgress />
          <Typography>{loadingMessage}</Typography>
        </Box>
      }
      contentStyle={{ color: color.blue[600] }}
    />
  );
}
