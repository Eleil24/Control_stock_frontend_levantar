import Swal from 'sweetalert2';
import type { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export const showSuccessAlert = (title: string, text?: string): Promise<SweetAlertResult> => {
    return Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
    });
};

export const showErrorAlert = (title: string, text?: string): Promise<SweetAlertResult> => {
    return Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
    });
};

export const showConfirmDialog = (
    title: string,
    text: string,
    confirmText: string = 'Sí, continuar',
    cancelText: string = 'Cancelar',
    icon: SweetAlertIcon = 'warning'
): Promise<SweetAlertResult> => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmText,
        cancelButtonText: cancelText
    });
};

export const showToastAlert = (icon: SweetAlertIcon, title: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return Toast.fire({
        icon,
        title
    });
};
