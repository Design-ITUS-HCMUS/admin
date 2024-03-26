'use client';
import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AlertState = 'info' | 'error' | 'success';

export interface ToastState {
  open?: boolean;
  alert: AlertState;
  message: {
    title: string;
    description?: React.ReactNode;
  };
}

const initialState: ToastState = {
  open: false,
  alert: 'info',
  message: {
    title: '',
  },
};

const toast = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<ToastState>) => ({
      ...state,
      open: true,
      alert: action.payload.alert,
      message: action.payload.message,
    }),
    setOpen: (state) => ({
      ...state,
      open: true,
    }),
    setClose: (state) => ({
      ...state,
      open: false,
    }),
  },
});

export default toast.reducer;
export const { setAlert, setOpen, setClose } = toast.actions;
