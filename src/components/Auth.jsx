import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Auth = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });
  return (
    <>
      <Card>
        <Card.Body>
          <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {/* <Row className="mb-3" md={1} lg={1}> */}
                <Row className="mb-4">
                  <Form.Group as={Col} lg={12}controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
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

                  <Form.Group as={Col} lg={12} controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
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
                </Row>
                <Button type="submit" as={Col} lg={12} >Submit form</Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
};

export default Auth;
