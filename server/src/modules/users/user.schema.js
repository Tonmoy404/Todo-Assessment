const { string, object, ref } = require("yup");

const createUserSchema = object().shape({
  email: string()
    .required("Email should not be empty")
    .email("Invalid Email Address"),
  firstName: string()
    .min(2, "First Name should be at least of 2 Characters")
    .max(20, "First Name can not be more than 20 characters")
    .required("Enter First Name"),
  lastName: string()
    .min(2, "Last Name should be at least of 2 Characters")
    .max(20, "Last Name can not be more than 20 characters")
    .required("Enter Last Name"),
  password: string()
    .min(6, "password can not be less than 6 characters")
    .max(20, "password can not be more than 20 characters")
    .required("Enter Your Password"),
  confirmPassword: string()
    .required("Enter Confirm password")
    .oneOf([ref("password"), null], "Confirm Password should be matched"),
});

module.exports.createUserSchema = createUserSchema;
