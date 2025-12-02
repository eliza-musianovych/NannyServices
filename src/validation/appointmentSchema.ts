import * as Yup from "yup";

export const appointmentSchema = Yup.object().shape({
    parentName: Yup.string()
        .required("Name is required")
        .min(2, "Name must contain at least 2 characters"),

    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),

    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(
            /^\+?[0-9]{10,15}$/,
            "Phone number must contain 10–15 digits (allowed leading +)"
        ),

    address: Yup.string()
        .required("Address is required")
        .min(5, "Address must be at least 5 characters"),

    childsAge: Yup.string()
        .required("Child age is required")
        .matches(
            /^[0-9]{1,2}$/,
            "Age must be a number between 0 and 99"
        ),

    meetingTime: Yup.string()
        .required("Meeting time is required")
        .matches(
            /^([0-1]\d|2[0-3]):([0-5]\d)$/,
            "Time must be in HH:MM format"
        ),

    comment: Yup.string()
        .max(300, "Comment must not exceed 300 characters")
});