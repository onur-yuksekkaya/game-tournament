import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useSweetAlert = () => {
  const HookSwal = withReactContent(Swal);

  const Toast = HookSwal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'white',
    color: 'white',
  });

  const successAlert = async (title = 'İşlem başarılı') => {
    await Toast.fire({
      timer: 3000,
      position: 'top-end',
      showConfirmButton: false,
      background: '#65a30d',
      icon: 'success',
      title,
    });
  };

  const confirmAlert = async (
    title = 'Soru?',
    confirmButtonText = 'Evet',
    cancelButtonText = 'Hayır'
  ) => {
    return await Toast.fire({
      showConfirmButton: true,
      showCancelButton: true,
      color: '#713f12',
      iconColor: '#713f12',
      background: 'white',
      icon: 'question',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ccc',
      confirmButtonText,
      cancelButtonText,
      title,
    });
  };

  return { successAlert, confirmAlert };
};
export default useSweetAlert;
