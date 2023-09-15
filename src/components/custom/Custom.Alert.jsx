import { useEffect } from 'react';
import Swal from 'sweetalert2';

const CustomAlert = (props) => {
    const { title, text, icon, confirmButtonText, onClose } = props;
    useEffect(() => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: confirmButtonText,
        }).then(() => {
            onClose();
        });
    }, [title, text, icon, confirmButtonText, onClose]);

    return null;
}

export default CustomAlert;
