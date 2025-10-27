import { useEffect, useState } from 'react';
import css from './AuthModal.module.css';

import { createPortal } from 'react-dom';
import { useId } from 'react';

import { IoMdClose } from "react-icons/io";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { 
    Field, 
    Form, 
    Formik, 
    type FormikHelpers,
    ErrorMessage
} from 'formik';
import { RegistrationSchema } from '../../validation/registrationSchema';
import { LoginSchema } from '../../validation/loginSchema';

type AuthModalProps = {
    mode: 'login' | 'register';
    onClose: () => void;
};

type AuthFormValues = {
    username?: string;
    email: string;
    password: string;
};

export default function AuthModal({ mode, onClose }: AuthModalProps) {
    const isRegister = mode === 'register';
    const fieldId = useId();

    const initialLogin: AuthFormValues = {
        email: "",
        password: "",
    };

    const initialRegister: AuthFormValues = {
        username: "",
        email: "",
        password: "",
    };

    const handleSubmit = (
        values: AuthFormValues,
        action: FormikHelpers<AuthFormValues>
    ) => {
        console.log(values);
        action.resetForm();
    };

    const [showPassword, setShowPassword] = useState(false);

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
                <h2 className={css.title}>{isRegister ? 'Registration' : 'Log In'}</h2>
                <p>{
                isRegister ?
                'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.' :
                'Welcome back! Please enter your credentials to access your account and continue your babysitter search.'
                }</p>

                <Formik 
                initialValues={isRegister ? initialRegister : initialLogin} 
                validationSchema={isRegister ? RegistrationSchema : LoginSchema}
                onSubmit={handleSubmit}
                >
                    <Form className={css.form}>

                        <fieldset className={css.fieldset}>
                            {isRegister &&
                            <>
                                <Field
                                className={css.formElement}
                                type='text'
                                name='username'
                                id={`${fieldId}-username`}
                                placeholder='Name'
                                />
                                <ErrorMessage
                                name='username'
                                component='span'
                                className={css.error}
                                />
                            </>
                            }

                            <Field
                            className={css.formElement}
                            type='email'
                            name='email'
                            id={`${fieldId}-email`}
                            placeholder='Email'
                            />
                            <ErrorMessage 
                            name='email' 
                            component='span'
                            className={css.error}
                            />

                            <div className={css.passwordContainer}>
                                <Field
                                className={css.formElement}
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                id={`${fieldId}-password`}
                                placeholder='Password'
                                />

                                <button
                                className={css.showPassword}
                                type='button'
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                                >
                                    {showPassword ?  
                                    <HiOutlineEye 
                                    color='var(---main-text-color)' 
                                    size={20}
                                    /> :
                                    <HiOutlineEyeOff 
                                    color='var(---main-text-color)' 
                                    size={20} 
                                    />}
                                </button>
                            </div>
                            <ErrorMessage 
                            name='password' 
                            component='span'
                            className={css.error}
                            />
                            
                        </fieldset>

                        <button 
                        className={css.submitBtn}
                        type='submit'
                        >
                            Sign Up
                        </button>

                    </Form>
                </Formik>
            </div>
        </div>,
        document.body
    )
};