import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as formik from "formik";
import * as yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import defautImage from "../../assets/default-image.jpg";
const CompleteProfile = () => {
  const { Formik } = formik;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState([]);
  const SubmitForm = (values, { resetForm }) => {
    // e.preventDefault();
    console.log("values: ", values);
    resetForm();
  };
  const schema = yup.object().shape({
    name: yup.string().max(50, "Too Long!").required("Required"),
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
      <Container fluid="md">
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <Col lg={6}>
            <Card className="shadow my-5 d-flex align-items-center">
              <Card.Img
                className="rounded-circle shadow-4-strong mt-4"
                variant="top"
                src={profileImage.length >= 1 ? profileImage : defautImage}
                style={{ width: "200px", height: "200px" }}
                // onError={(e)=>{
                //   e.target.src=defautImage
                // }}
              />
              <Card.Body>
                <div>
                  <Formik
                    validationSchema={schema}
                    onSubmit={(values, { resetForm }) =>
                      SubmitForm(values, { resetForm })
                    }
                    initialValues={{
                      name: "",
                      password: "",
                      confirmPassword: "",
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      errors,
                    }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        {/* <Row className="mb-3" md={1} lg={1}> */}
                        <Row className="mb-4 px-4">
                          <Form.Group as={Col} lg={12} controlId="name">
                            <Form.Label className="my-2">Name</Form.Label>
                            <InputGroup hasValidation>
                              {/* <InputGroup.Text id="basic-addon1">
                                <TfiEmail />
                              </InputGroup.Text> */}
                              <Form.Control
                                type="text"
                                placeholder="Please enter your name"
                                aria-describedby="inputGroupName"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.name}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>

                          <Form.Group as={Col} lg={12} controlId="password">
                            <Form.Label className="my-2">Password</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="basic-addon1">
                                <RiLockPasswordLine />
                              </InputGroup.Text>
                              <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder=""
                                aria-describedby="inputGroupPassword"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                              />
                              <InputGroup.Text>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowPassword(!showPassword);
                                  }}
                                >
                                  {showPassword ? (
                                    <FaRegEyeSlash
                                      style={{ fontSize: "1.5rem" }}
                                    />
                                  ) : (
                                    <FaRegEye style={{ fontSize: "1.5rem" }} />
                                  )}
                                </button>
                              </InputGroup.Text>
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            lg={12}
                            controlId="confirmPassword"
                          >
                            <Form.Label className="my-2">
                              Confirm Password
                            </Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="basic-addon1">
                                <RiLockPasswordLine />
                              </InputGroup.Text>
                              <Form.Control
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder=""
                                aria-describedby="inputGroupConfirmPassword"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword}
                              />
                              <InputGroup.Text>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowConfirmPassword(
                                      !showConfirmPassword
                                    );
                                  }}
                                >
                                  {showConfirmPassword ? (
                                    <FaRegEyeSlash
                                      style={{ fontSize: "1.5rem" }}
                                    />
                                  ) : (
                                    <FaRegEye style={{ fontSize: "1.5rem" }} />
                                  )}
                                </button>
                              </InputGroup.Text>
                              <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>
                        </Row>
                        <Row className="mb-4 px-4">
                          <Col>
                            <Button
                              type="submit"
                              style={{ width: "100%" }}
                              className=""
                            >
                              Update
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CompleteProfile;
