import { toast, ToastPosition } from 'react-toastify';

export const notifyWithToastify = (
  type: 'error' | 'success' | 'warning',
  message: string,
  duration?: number,
) => {
  const options = {
    position: 'top-right' as ToastPosition,
    autoClose: duration ?? 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };
  switch (type) {
    case 'error':
      toast.error(message, options);
      break;
    case 'success':
      toast.success(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};
