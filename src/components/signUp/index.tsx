import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './style.css';
import { TextField, Button } from "@material-ui/core";


interface SignUpForm {
    firstname: string;
    lastname: string;
    email: string;
    password: string | null;
    confirm_password: string | null;
}

const initialValues: SignUpForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
};
const onSubmit = (values: SignUpForm, onSubmitProps: any) => {
    console.log(values);
    alert(JSON.stringify(values));
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is Required"),
    lastname: Yup.string().required("Last Name is Required"),
    email: Yup.string().email("Invalid Email Format").required("Email is Required"),
    password: Yup.string()
      .required("Password is Required")
      .max(20, "Password should be maximun of 20 characters")
      .min(6, "Password must be atleast of 6 characters"),
    confirm_password: Yup.string()
      .required("Confirm Password is Required")
      .oneOf([Yup.ref("password")], "Password do not matched"),
  });

export const SignUp = () => {
    return (
        <div className="signup">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
            
          {(formik) => {
            return (
              <Form className="form">
                <h1 className="heading">Sign Up</h1>
                    <Field className="fields"
                      name="firstname"
                      as={TextField}
                      label="First Name"
                      variant="outlined"
                      helperText={
                        <div className="error">
                        <ErrorMessage name="firstname"/></div>
                      }
                    />
                    <Field  className="fields l-field"
                      name="lastname"
                      as={TextField}
                      label="Last Name"
                      variant="outlined"
                      helperText={<div className="error">
                        <ErrorMessage name="lastname"/></div>
                      }
                    />
                    <br/>
                    <Field
                     className="fields w-field"
                      name="email"
                      as={TextField}
                      label="E-mail"
                      variant="outlined"
                      helperText={
                        <div className="error">
                        <ErrorMessage name="email"/></div>
                      }
                    />
                    <br/>
                    <Field
                     className="fields w-field"
                      name="password"
                      as={TextField}
                      label="Password"
                      type="password"
                      variant="outlined"
                      helperText={
                        <div className="error">
                        <ErrorMessage name="password"/></div>
                      }
                    />
                    <br/>
                    <Field
                     className="fields w-field"
                      name="confirm_password"
                      as={TextField}
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      helperText={
                        <div className="error">
                        <ErrorMessage name="confirm_password"/></div>
                      }
                    />
                  <br />
                    <Button className="btn"
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={formik.isSubmitting}
                      size="large"
                    >
                      <span className="submitBtn">Submit</span>
                    </Button>
              </Form>
            );
          }}
        </Formik>
        </div>
      );

}