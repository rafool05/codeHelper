import { toast, type ToastOptions } from 'react-toastify';

export function ToastError(message: string, options?: ToastOptions) {
  toast.error(message, {
    theme: 'dark',
    position: 'top-right',
    autoClose: 600,
    pauseOnHover: false,
    ...options,
  });
}

export function ToastSuccess(message: string, options?: ToastOptions) {
  toast.success(message, {
    theme: 'dark',
    position: 'top-right',
    autoClose: 600,
    pauseOnHover: false,
    ...options,
  });
}
