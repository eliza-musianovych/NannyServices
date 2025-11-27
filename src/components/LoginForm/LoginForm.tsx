import css from './LoginForm.module.css';

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

import { LoginSchema } from '../../validation/loginSchema';
import { loginUser } from '../../services/authService';

type LoginFormValues = {
    email: string;
    password: string;
};

type LoginFormProps = {
    onClose: () => void;
}

export default function LoginForm ({ onClose }: LoginFormProps) {
    const fieldId = useId();

    const [showPassword, setShowPassword] = useState(false);

    const initialLogin: LoginFormValues = {
        email: "",
        password: "",
    };

    const handleLogin = async (
            values: LoginFormValues,
            actions: FormikHelpers<LoginFormValues>
        ) => {
            const user = await loginUser(values.email, values.password);
            console.log(user);
            actions.resetForm();
            onClose();
        };

    return (
        <>
        <h2 className={css.title}>Log In</h2>
                <p>Welcome back! Please enter your credentials to access your account and continue your babysitter search.</p>

                <Formik<LoginFormValues>
                initialValues={initialLogin} 
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
                >
                    <Form className={css.form}>

                        <fieldset className={css.fieldset}>

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
                        Log In
                        </button>

                    </Form>
                </Formik>
        </>
    )
}