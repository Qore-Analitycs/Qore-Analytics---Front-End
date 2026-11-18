import { Slide, toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 7000,
  closeOnClick: true,
  draggable: true,
  transition: Slide,
};

export const toastSucesso = (msg: string) =>
  toast.success(msg, { ...defaultOptions });

export const toastErro = (msg: string) =>
  toast.error(msg, { ...defaultOptions });

export const toastInfo = (msg: string) =>
  toast.info(msg, { ...defaultOptions });
