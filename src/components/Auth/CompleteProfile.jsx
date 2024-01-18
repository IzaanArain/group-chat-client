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
import defautImage from "../../assets/default-image.jpg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const CompleteProfile = () => {
  const [profileImage, setProfileImage] = useState([]);
  const SubmitForm = (values, { resetForm }) => {
    // e.preventDefault();
    console.log("values: ", values);
    resetForm();
  };

  const phoneRegExp = /^((\+[1-9]{1,4}[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/ 
  
  const schema = yup.object().shape({
    name: yup.string().max(50, "Too Long!").required("Required"),
    phone: yup
      .string()
      .max(15,"Too Long!")
      .min(11,"Too small")
      // .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    image: yup.mixed().required("Image is required"),
  });
  return (
    <>
      <Container fluid="md">
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <Col lg={6} xl={4}>
            {/* d-flex align-items-center */}
            <Card className="shadow my-5 ">
              <Row>
                <Col className="d-flex justify-content-center">
                  <Card.Img
                    className="rounded-circle shadow border mt-4"
                    variant="top"
                    src={
                      profileImage.length >= 1
                        ? URL.createObjectURL(profileImage[0])
                        : defautImage
                    }
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
                          image: null,
                        }}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          values,
                          touched,
                          errors,
                          setFieldValue,
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
                                <InputGroup
                                  hasValidation
                                  className="d-flex align-items-center"
                                  id={errors.phone && "phoneInput"}
                                >
                                  {/* <Form.Control
                                    type="tel"
                                    placeholder="Please enter your phone number"
                                    aria-describedby="inputGroupPhone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    isInvalid={!!errors.phone}
                                  /> */}
                                  {/* <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                  </Form.Control.Feedback> */}
                                  <PhoneInput
                                    autoComplete="on"
                                    placeholder="Please enter your phone number"
                                    value={values.phone}
                                    onChange={(value) =>
                                      setFieldValue("phone", value)
                                    }
                                    className="p-2 rounded"
                                    style={{ width: "90%" }}
                                  />
                                  {errors.phone && (
                                    <AiOutlineExclamationCircle className=" fs-5 text-end text-danger" />
                                  )}
                                </InputGroup>
                                {errors.phone && (
                                  <Form.Text className="text-danger">
                                    {errors.phone}
                                  </Form.Text>
                                )}
                              </Form.Group>

                              <Form.Group as={Col} lg={12} controlId="image">
                                <Form.Label className="my-2">
                                  Upload Image
                                </Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="file"
                                    placeholder="Please upload image"
                                    // multiple
                                    aria-describedby="inputGroupImage"
                                    onChange={(event) => {
                                      setProfileImage(
                                        event.currentTarget.files
                                      );
                                      setFieldValue(
                                        "image",
                                        event.currentTarget.files
                                      );
                                    }}
                                    name="image"
                                    isInvalid={!!errors.image}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.image}
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
