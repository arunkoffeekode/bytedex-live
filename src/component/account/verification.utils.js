import * as yup from "yup";
export const INITIAL_COUNTRY = "IN";

export const level1Initials = {
  fullName: "",
  gender: "Male",
  maritalStatus: "Single",
  dateOfBirth: "",
  documentIdNumber: "",
  guardian: "",
  mobile: "",
  email: "",
  nationality: INITIAL_COUNTRY,
  address1: "",
  address2: "",
  pin: "",
  city: "",
  state: "",
};

export const level1ValidationSchema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required.")
    .min(4, "Name is too short, it has to be atleast 4 characters.")
    .max(64, "Name is too long, it has to be within 64 characters."),
  gender: yup
    .string()
    .required("Gender is required.")
    .oneOf(
      ["Male", "Female", "Other"],
      "Gender has to be one of Male, Female or Other."
    ),
  maritalStatus: yup
    .string()
    .required("Marital Status is required.")
    .oneOf(["Single", "Married"], "Gender has to be one of Single or Married."),
  dateOfBirth: yup.string().required("Date of Birth is required."),
  documentIdNumber: yup
    .string()
    .required("Id Card Number is required.")
    .min(4, "Id Card Number is too short. it has to be atleast 4 characters.")
    .max(24, "Id Card Number is too long. it has to be within 24 characters."),
  guardian: yup
    .string()
    .required("Job Information is required.")
    .min(4, "Job Information is too short. it has to be atleast 4 characters.")
    .max(64, "Job Information is too long. it has to be within 64 characters."),
  mobile: yup
    .string()
    .required("A Valid Mobile Number is required.")
    .matches(
      /^\+[1-9]{1}[0-9]{3,14}$/,
      "A Valid Mobile Number with Country Code is required."
    ),
  email: yup
    .string()
    .required("A Valid Email is required.")
    .email("A Valid Email is required."),
  nationality: yup.string().required("Nationality is required."),
  address1: yup
    .string()
    .required("Address is required.")
    .min(8, "Address is too short. it has to be atleast 8 characters.")
    .max(128, "Address is too long. it has to be within 128 characters."),
  address2: yup
    .string()
    .optional("Address is Optional.")
    .min(8, "Address is too short. it has to be atleast 8 characters.")
    .max(128, "Address is too long. it has to be within 128 characters."),
  pin: yup
    .string()
    .required("Pin Code is required.")
    .length(6, "This has to be 6 characters long."),
  state: yup.string().required("State is required."),
  city: yup.string().required("City is required."),
});
