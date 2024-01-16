import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";

const SignUp = () => {
  const { Formik } = formik;

  const SubmitForm=(values)=>{
    // e.preventDefault();
    console.log("values: ",values)
  }
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .max(50, "Too Long!")
      .required("Required"),
    password: yup
      .string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
      confirmPassword: yup
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
          onSubmit={(values)=>SubmitForm(values)}
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {/* <Row className="mb-3" md={1} lg={1}> */}
              <Row className="mb-4 px-4">
                <Form.Group as={Col} lg={12} controlId="email">
                  <Form.Label className="my-2">Email</Form.Label>
                  <InputGroup hasValidation>
                  <InputGroup.Text id="basic-addon1"><TfiEmail /></InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder=""
                      aria-describedby="inputGroupEmail"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} lg={12} controlId="password">
                  <Form.Label className="my-2">Password</Form.Label>
                  <InputGroup hasValidation>
                  <InputGroup.Text id="basic-addon1"><RiLockPasswordLine /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder=""
                      aria-describedby="inputGroupPassword"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} lg={12}  controlId="confirmPassword">
                  <Form.Label className="my-2">Confirm Password</Form.Label>
                  <InputGroup hasValidation>
                  <InputGroup.Text id="basic-addon1"><RiLockPasswordLine /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder=""
                      aria-describedby="inputGroupConfirmPassword"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-4 px-4">
                <Col>
                  <Button type="submit" style={{ width: "100%" }} className="">
                    Sign Up
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

export default SignUp;
