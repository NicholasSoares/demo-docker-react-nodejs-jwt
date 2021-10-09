import Swal from 'sweetalert2';

/**
 * 
 */
export const showFullScreenLoader = () => {
  Swal.fire({
    allowOutsideClick: false,
    showConfirmButton: false
  });
  Swal.showLoading();
};

/**
 * 
 */
export const closeFullScreenLoader = () => {
  Swal.close();
};

/**
 * 
 */
export const showErrorMessage = (message) => {
  Swal.close();
  Swal.fire({
    text: message,
    icon: 'error',
    confirmButtonText: 'Ok'
  });
};

/**
 * 
 */
export const showSuccessMessage = (message) => {
  Swal.close();
  Swal.fire({
    text: message,
    icon: 'success',
    confirmButtonText: 'Ok'
  });
};
