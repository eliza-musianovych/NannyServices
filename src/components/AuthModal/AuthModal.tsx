import { useEffect } from 'react';
import css from './AuthModal.module.css';

import { createPortal } from 'react-dom';

import { IoMdClose } from "react-icons/io";
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

type AuthModalProps = {
    mode: 'login' | 'register';
    onClose: () => void;
};

export default function AuthModal({ mode, onClose }: AuthModalProps) {
    const isRegister = mode === 'register';

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
                {
                isRegister ? 
                <RegisterForm onClose={onClose}/> :
                <LoginForm onClose={onClose}/>
                }
            </div>
        </div>,
        document.body
    )
};