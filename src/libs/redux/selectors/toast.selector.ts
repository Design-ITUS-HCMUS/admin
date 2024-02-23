import { RootState } from '../reducers';

const toastSelector = (state: RootState) => state.toast;

const open = (state: RootState) => toastSelector(state).open;
const alert = (state: RootState) => toastSelector(state).alert;
const message = (state: RootState) => toastSelector(state).message;

const ToastSelector = {
  toastSelector,
  open,
  alert,
  message,
};

export default ToastSelector;
