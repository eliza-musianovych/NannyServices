import { useEffect } from 'react';
import css from './AuthModal.module.css';

import { createPortal } from 'react-dom';

import { IoMdClose } from "react-icons/io";

type AuthModalProps = {
    mode: 'login' | 'register';
    onClose: () => void;
}

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
                onClick={onClose}
                aria-label="Close modal"
                >
                    <IoMdClose size={32}/>
                </button>
                <h2>{isRegister ? 'Registration' : 'Log In'}</h2>
                <p>{
                isRegister ?
                'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.' :
                'Welcome back! Please enter your credentials to access your account and continue your babysitter search.'
                }</p>
            </div>
        </div>,
        document.body
    )
};