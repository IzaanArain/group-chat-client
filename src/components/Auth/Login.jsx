import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const { Formik } = formik;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const SubmitForm = (values, { resetForm }) => {
    // e.preventDefault();
    console.log("values: ", values);
    resetForm();
  };

  const schema = yup.object().shape({
    loginEmail: yup
      .string()
      .email("Invalid email")
      .max(50, "Too Long!")
      .required("Required"),
    loginPassword: yup
      .string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  return (
    <>
      <div>
        <Formik
          validationSchema={schema}
          onSubmit={(values, { resetForm }) =>
            SubmitForm(values, { resetForm })
          }
          initialValues={{
            loginEmail: "",
            loginPassword: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {/* <Row className="mb-3" md={1} lg={1}> */}
              <Row className="mb-4 px-4">
                <Form.Group as={Col} lg={12} controlId="loginEmail">
                  <Form.Label className="my-2">Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="basic-addon1">
                      <TfiEmail />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder=""
                      aria-describedby="inputGroupEmail"
                      name="loginEmail"
                      value={values.loginEmail}
                      onChange={handleChange}
                      isInvalid={!!errors.loginEmail}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.loginEmail}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} lg={12} controlId="loginPassword">
                  <Form.Label className="my-2">Password</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="basic-addon1">
                      <RiLockPasswordLine />
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      aria-describedby="inputGroupPassword"
                      name="loginPassword"
                      value={values.loginPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.loginPassword}
                    />
                    <InputGroup.Text>
                      <button type="button" onClick={(e)=>{
                        e.preventDefault()
                        setShowPassword(!showPassword)
                      }}>
                        {showPassword ?   <FaRegEyeSlash style={{ fontSize: "1.5rem" }}/>  : <FaRegEye style={{ fontSize: "1.5rem" }}/>}
                      </button>
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.loginPassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-4 px-4">
                <Col>
                  <Button type="submit" style={{ width: "100%" }} className="">
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
