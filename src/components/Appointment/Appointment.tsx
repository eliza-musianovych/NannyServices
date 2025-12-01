import css from './Appointment.module.css';

import { useId } from 'react';
import { 
    Field, 
    Form, 
    Formik
} from 'formik';
import type { Nannie } from '../../types/nanniesType';
import clsx from 'clsx';

type AppointmentFormValues = {
    address: string;
    phoneNumber: string;
    childsAge: string;
    meetingTime: string;
    email: string;
    parentName: string;
    comment: string;
};

type AppointmentProps = {
    nannie: Nannie;
};

export default function Appointment ({ nannie }: AppointmentProps) {
    const fieldId = useId();

    const initialAppointment: AppointmentFormValues = {
        address: '',
        phoneNumber: '',
        childsAge: '',
        meetingTime: '',
        email: '',
        parentName: '',
        comment: '',
    };

    const handleSubmit = () => {};

    return (
        <>
            <h2 className={css.title}>Make an appointment with a babysitter</h2>
            <p className={css.text}>Arranging a meeting with a caregiver for your child is the first step to creating a safe and comfortable environment. Fill out the form below so we can match you with the perfect care partner.</p>

            <div className={css.nannieContainer}>
                <img 
                className={css.img}
                width={44}
                height={44}
                src={nannie.avatar_url} 
                alt={nannie.name}
                />
                <div className={css.nameContainer}>
                    <p className={css.yourNanny}>Your nanny</p>
                    <h3 className={css.name}>{nannie.name}</h3>
                </div>
            </div>

            <Formik<AppointmentFormValues>
                initialValues={initialAppointment}
                onSubmit={handleSubmit}
            >
                <Form className={css.form}>
                    <div className={css.fieldContainer}>
                        <Field
                            className={clsx(css.formElement, css.smallElement)}
                            type='text'
                            name='address'
                            id={`${fieldId}-address`}
                            placeholder='Address'
                        />

                        <Field
                            className={clsx(css.formElement, css.smallElement)}
                            type='tel'
                            name='phoneNumber'
                            id={`${fieldId}-phoneNumber`}
                            placeholder='+380'
                        />
                    </div>

                    <div className={css.fieldContainer}>
                        <Field
                            className={css.formElement}
                            type='text'
                            name='childsAge'
                            id={`${fieldId}-childsAge`}
                            placeholder='Child`s age'
                        />

                        <Field
                            className={css.formElement}
                            type='time'
                            name='meetingTime'
                            id={`${fieldId}-meetingTime`}
                        />
                    </div>

                    <Field
                        className={css.formElement}
                        type='email'
                        name='email'
                        id={`${fieldId}-email`}
                        placeholder='Email'
                    />

                    <Field
                        className={css.formElement}
                        type='text'
                        name='parentName'
                        id={`${fieldId}-parentName`}
                        placeholder='Father`s or mother`s name'
                    />

                    <Field
                        className={css.formElement}
                        type='text'
                        name='comment'
                        id={`${fieldId}-comment`}
                        placeholder='Comment'
                    />

                    <button
                    className={css.submitBtn}
                    type='submit'
                    >
                        Send
                    </button>
                </Form>
            </Formik>
        </>
    )
}