import Swal from 'sweetalert2';

/**
 * Show full screen loader
 */
export const showFullScreenLoader = () => {
  Swal.fire({
    allowOutsideClick: false,
    showConfirmButton: false
  });
  Swal.showLoading();
};

/**
 * Close an active full screen loader
 */
export const closeFullScreenLoader = () => {
  Swal.close();
};

/**
 * Close any active swal alerts or loaders and show a error message
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
 * Close any active swal alerts or loaders and show a success message
 */
export const showSuccessMessage = (message) => {
  Swal.close();
  Swal.fire({
    text: message,
    icon: 'success',
    confirmButtonText: 'Ok'
  });
};
