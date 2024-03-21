'use client';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks';
import { RootState } from '@/libs/redux/reducers';
import {
  setAlert as setAlertAction,
  setClose as setCloseAction,
  setOpen as setOpenAction,
  ToastState,
} from '@/libs/redux/reducers/toast.reducer';
import ToastSelector from '@/libs/redux/selectors/toast.selector';

type ParaFunction = (arg: ToastState) => void;

type UseToastReturn = {
  open: RootState['toast']['open'];
  alert: RootState['toast']['alert'];
  message: RootState['toast']['message'];
  setOpen: VoidFunction;
  setClose: VoidFunction;
  setAlert: ParaFunction;
};
/**
 * An example for a custom hook that wraps a redux state selectors
 * and actions and provides a summary of the store usage
 * @returns open: the toast is opening or not; alert: state of toast; message: title and description of toast; setAlert: make a new alert
 */
const useToast = (): UseToastReturn => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(ToastSelector.open);
  const alert = useAppSelector(ToastSelector.alert);
  const message = useAppSelector(ToastSelector.message);

  const setOpen: VoidFunction = React.useCallback(() => {
    dispatch(setOpenAction());
  }, [dispatch]);

  const setClose: VoidFunction = React.useCallback(() => {
    dispatch(setCloseAction());
  }, [dispatch]);

  const setAlert: ParaFunction = React.useCallback(
    (newToast) => {
      dispatch(setAlertAction(newToast));
    },
    [dispatch]
  );

  return {
    open,
    alert,
    message,
    setOpen,
    setClose,
    setAlert,
  };
};

export default useToast;
