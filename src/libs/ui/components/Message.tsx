'use client';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/CloseRounded';
import ErrorIcon from '@mui/icons-material/ErrorRounded';
import SuccessIcon from '@mui/icons-material/CheckCircleRounded';

import { colors } from '@/libs/ui';
import { useToast } from '@/hooks';

const progressColors = {
  success: colors.notification.success,
  error: colors.notification.error,
  info: colors.blue[500],
};

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='right' />;
}

const Progress = styled('div', {
  shouldForwardProp: (prop) => prop === 'color',
})(({ color, theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '3px',
  width: '100%',
  backgroundColor: color,
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '100%',
    width: '0%',
    backgroundColor: theme.palette.background.paper,
    animation: 'progress 5s linear forwards',
    '@keyframes progress': {
      '100%': {
        width: '100%',
      },
    },
  },
}));

export function Message() {
  const toast = useToast();
  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={5000}
      onClose={() => toast.setClose()}
      TransitionComponent={SlideTransition}>
      <Paper
        sx={{
          boxShadow:
            '0px 6px 6px -3px rgba(0,0,0,0.1), 0px 10px 14px 1px rgba(0,0,0,0.05), 0px 4px 18px 3px rgba(0,0,0,0.05)',
          padding: 2,
          width: 350,
        }}>
        <Stack direction='row' spacing={2}>
          {toast.alert === 'success' ? (
            <SuccessIcon color='success' />
          ) : toast.alert === 'error' ? (
            <ErrorIcon color='error' />
          ) : null}
          <div style={{ width: '100%' }}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              mb={Boolean(toast.message.description) ? 1 : 0}>
              <Typography fontWeight='bold'>{toast.message.title}</Typography>
              <IconButton onClick={() => toast.setClose()} size='small'>
                <CloseIcon fontSize='small' />
              </IconButton>
            </Stack>
            <Typography>{toast.message.description}</Typography>
          </div>
        </Stack>
        <Progress color={`${progressColors[toast.alert]}`} />
      </Paper>
    </Snackbar>
  );
}
