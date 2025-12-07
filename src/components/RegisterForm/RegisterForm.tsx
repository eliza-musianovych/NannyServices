import css from './RegisterForm.module.css';

import { 
    useId,
    useState
} from 'react';

import { 
    HiOutlineEye, 
    HiOutlineEyeOff 
} from "react-icons/hi";
import { 
    Field, 
    Form, 
    Formik, 
    type FormikHelpers,
    ErrorMessage
} from 'formik';
import { RegistrationSchema } from '../../validation/registrationSchema';

import { registerUser } from '../../services/authService';

type RegisterFormValues = {
    username: string;
    email: string;
    password: string;
};

type RegisterFormProps = {
    onClose: () => void;
};

export default function RegisterForm ({ onClose }: RegisterFormProps) {
    const fieldId = useId();

    const [showPassword, setShowPassword] = useState(false);

    const initialRegister: RegisterFormValues = {
        username: "",
        email: "",
        password: "",
    };

    const handleRegister = async (
            values: RegisterFormValues,
            actions: FormikHelpers<RegisterFormValues>
        ) => {
            await registerUser(values.username, values.email, values.password);
            actions.resetForm();
            onClose();
        };

    return (
        <>
            <h2 className={css.title}>Registration</h2>
                <p>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>
                <Formik<RegisterFormValues>
                initialValues={initialRegister}
                validationSchema={RegistrationSchema}
                onSubmit={handleRegister}
                >
                    <Form className={css.form}>
                        <fieldset className={css.fieldset}>
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
                                    color='var(--main-text-color)'
                                    size={20}
                                    /> :
                                    <HiOutlineEyeOff
                                    color='var(--main-text-color)'
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
        </>
    )
}