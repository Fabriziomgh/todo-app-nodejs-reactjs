import Swal from 'sweetalert2';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css';

const ToastDelete = Swal.mixin({
   title: 'You are sure?',
   html: "You won't be able to revert this!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Yes, delete it!',
   toast: true,
   position: 'top-end',
});

const ToastMessage = Swal.mixin({
   toast: true,
   position: 'top-end',
   timer: 2000,
   timerProgressBar: true,
   showConfirmButton: false,
});

export { ToastDelete, ToastMessage };
