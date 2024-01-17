import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import defautImage from "../../assets/default-image.jpg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const CompleteProfile = () => {
  const [profileImage, setProfileImage] = useState([]);

  const SubmitForm = (values, { resetForm }) => {
    // e.preventDefault();
    console.log("values: ", values);
    resetForm();
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    name: yup.string().max(50, "Too Long!").required("Required"),
    phone: yup
      .string()
      .min(11, "Too Short!")
      .max(12, "Too Long!")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
  });
  return (
    <>
      <Container fluid="md">
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <Col lg={4}>
            {/* d-flex align-items-center */}
            <Card className="shadow my-5 ">
              <Row>
                <Col className="d-flex justify-content-center">
                  <Card.Img
                    className="rounded-circle shadow border mt-4"
                    variant="top"
                    src={profileImage.length >= 1 ? URL.createObjectURL(profileImage[0]) : defautImage}
                    style={{ width: "150px", height: "150px" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Body>
                    <div>
                      <Formik
                        validationSchema={schema}
                        onSubmit={(values, { resetForm }) =>
                          SubmitForm(values, { resetForm })
                        }
                        initialValues={{
                          name: "",
                          phone: "",
                        }}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          values,
                          touched,
                          errors,
                          setFieldValue
                        }) => (
                          <Form noValidate onSubmit={handleSubmit}>
                            {/* <Row className="mb-3" md={1} lg={1}> */}
                            <Row className="mb-4 px-4">
                              
                              <Form.Group as={Col} lg={12} controlId="name">
                                <Form.Label className="my-2">Name</Form.Label>
                                <InputGroup hasValidation>
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

                              <Form.Group as={Col} lg={12} controlId="phone">
                                <Form.Label className="my-2">
                                  Phone Number
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="tel"
                                    placeholder="Please enter your phone number"
                                    aria-describedby="inputGroupPhone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    isInvalid={!!errors.phone}
                                  />
                                  {/* <PhoneInput
                                    placeholder="Enter phone number"
                                    value={values.phone}
                                    onChange={handleChange}
                                    isInvalid={!!errors.phone}
                                  /> */}
                                  <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                  </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>


                            </Row>
                            <Row className="mb-4 px-4">
                              <Col lg={12}>
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
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CompleteProfile;
