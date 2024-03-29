import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { signUpUser } from "../../features/featureActions/Actions";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const { Formik } = formik;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate=useNavigate();
  const SubmitForm = async(values, { resetForm }) => {
    // e.preventDefault();
    try {
      let payload = {
        body: values,
        params: false,
        isToast: true,
      };
     const user= await dispatch(signUpUser(payload)).unwrap();
     console.log("userId",user)
      navigate("/verifyAccount",{state:{userId:user?.data?.data?.userId}});
      resetForm();
    } catch (rejectedValueOrSerializedError) {
      // console.log("signup component:",rejectedValueOrSerializedError)
      // resetForm()
    }
  };
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
          onSubmit={(values, { resetForm }) =>
            SubmitForm(values, { resetForm })
          }
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
                    <InputGroup.Text id="basic-addon1">
                      <TfiEmail />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder=""
                      aria-describedby="inputGroupEmail"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
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
                      required
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
                          <FaRegEyeSlash style={{ fontSize: "1.5rem" }} />
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

                <Form.Group as={Col} lg={12} controlId="confirmPassword">
                  <Form.Label className="my-2">Confirm Password</Form.Label>
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
                      required
                    />
                    <InputGroup.Text>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      >
                        {showConfirmPassword ? (
                          <FaRegEyeSlash style={{ fontSize: "1.5rem" }} />
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
