import { useEffect } from 'react';
import css from './Modal.module.css';

import { createPortal } from 'react-dom';

import { IoMdClose } from "react-icons/io";
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import type { Nannie } from '../../types/nanniesType';
import Appointment from '../Appointment/Appointment';

type ModalProps = {
    mode: 'login' | 'register' | 'appointment';
    onClose: () => void;
    nannie?: Nannie;
};

export default function Modal({ mode, onClose, nannie }: ModalProps) {
    const isRegister = mode === 'register';
    const isAppointment = mode === 'appointment';

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return createPortal(
        <div 
        className={css.backdrop}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        >
            <div className={css.modal}>
                <button
                className={css.closeBtn}
                onClick={onClose}
                aria-label="Close modal"
                >
                    <IoMdClose size={32} color='var(--main-text-color)'/>
                </button>
                {isRegister && <RegisterForm onClose={onClose}/>}
                {!isRegister && !isAppointment && <LoginForm onClose={onClose}/>}
                {isAppointment && <Appointment nannie={nannie}/>}
            </div>
        </div>,
        document.body
    )
};