import * as Yup from 'yup';

export const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
    .required('Username is required'),
    email: Yup.string()
    .email()
    .required('Email is required'),
    password: Yup.string()
    .min(5, 'Password is too short')
    .required('Password is required'),
});