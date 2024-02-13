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
import defautImage from "../assets/default-image.jpg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { completeUserProfile } from "../features/featureActions/Actions";
// import { useNavigate,useLocation } from "react-router-dom";
import { getUser } from "../features/slices/AuthSlice";
import UploadIcon from "../assets/UploadIcon";

const CompleteProfile = () => {
  const [profileImage, setProfileImage] = useState([]);
  const dispatch = useDispatch();
  // const navigate=useNavigate();
  // const location=useLocation();
  // const userId=location?.state?.userId ? location?.state?.userId : null
  const user = useSelector(getUser);
  const SubmitForm = async (values, { resetForm }) => {
    try {
      // Extracting the address value
      const selectedAddress = values?.address?.label;
      // Extracting the address lat long
      const results = await geocodeByAddress(selectedAddress);
      const { lat, lng } = await getLatLng(results[0]);
      var formData = new FormData();
      const appendIfValue = (key, value) => {
        if (value !== undefined && value.trim() !== "") {
          formData.append(key, value);
        }
      };
      appendIfValue("name", values.name);
      appendIfValue("phone", values.phone);
      // appendIfValue("_id",userId);
      appendIfValue("address", selectedAddress);
      formData.append("lat", lat);
      formData.append("long", lng);
      // formData.append("profileImage",values.image)
      if (values?.image?.length >= 1) {
        values.image.forEach((img) => {
          formData.append(`profileImage`, img);
        });
      }
      let payload = {
        body: formData,
        params: false,
        isToast: true,
      };
      await dispatch(completeUserProfile(payload)).unwrap();
      // navigate("/home")
      // resetForm();
    } catch (rejectedValueOrSerializedError) {}
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Too short")
      .max(50, "Too Long!")
      .required("Required"),
    phone: yup
      .string()
      .max(15, "Too Long!")
      .min(11, "Too short")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    // image: yup.mixed().required("Image is required"),
    address: yup.mixed().required("address is required"),
  });

  return (
    <>
      <Container fluid="md">
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <Col lg={6} xl={4}>
            {/* d-flex align-items-center */}
            <Card className="shadow my-5 ">
              {/* <Row>
                <Col className="d-flex justify-content-center">
                  <Card.Img
                    className="rounded-circle shadow border mt-4"
                    variant="top"
                    src={
                      user.profileImage && profileImage.length === 0
                        ? `${import.meta.env.VITE_API_URL}/${user.profileImage}`
                        : profileImage.length >= 1
                        ? URL.createObjectURL(profileImage[0])
                        : defautImage
                    }
                    style={{ width: "150px", height: "150px" }}
                  />
                </Col>
              </Row> */}
              <Row>
                <Col>
                  <Card.Body>
                    <div>
                      <Formik
                        validationSchema={schema}
                        onSubmit={(values, { resetForm }) => {
                          SubmitForm(values, { resetForm });
                        }}
                        initialValues={{
                          name: user?.name,
                          phone: user.phone,
                          // phone: null,
                          image: null,
                          // address: null,
                          address: {
                            label: user?.location?.address,
                          },
                        }}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          values,
                          touched,
                          errors,
                          setFieldValue,
                          handleBlur,
                        }) => (
                          <Form noValidate onSubmit={handleSubmit}>
                            {/* <Row className="mb-3" md={1} lg={1}> */}
                            <Row className="mb-4 px-4">
                              <Form.Group
                                as={Col}
                                lg={12}
                                controlId="image"
                                className="my-2 d-flex flex-column justify-content-center align-items-center"
                              >
                                {/* <Form.Label className="my-2">
                                  Upload Image
                                </Form.Label> */}
                                <Form.Label>
                                  <InputGroup hasValidation>
                                    <div className="position-relative">
                                      <Card.Img
                                        className="rounded-circle shadow border mt-4"
                                        variant="top"
                                        src={
                                          user.profileImage &&
                                          profileImage.length === 0
                                            ? `${import.meta.env.VITE_API_URL}/${user.profileImage}`
                                            : profileImage.length >= 1
                                            ? URL.createObjectURL(profileImage[0])
                                            : defautImage
                                        }
                                        style={{
                                          width: "150px",
                                          height: "150px",
                                        }}
                                      />
                                      {/* <UploadIcon/> */}
                                    
                                     <MdCloudUpload
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          position: "absolute",
                                          left: "110px",
                                          bottom: "10px",
                                          background:"#30D5C8",
                                          borderRadius:"100%",
                                          padding:"5px",
                                        }}
                                        className="shadow-lg"
                                      />
                                    </div>
                                    <Form.Control
                                      className="d-none"
                                      type="file"
                                      multiple
                                      name="image"
                                      aria-describedby="inputGroupImage"
                                      onChange={(event) => {
                                        // const filesArray = Array.from(event.currentTarget.files);
                                        const fileList = event.currentTarget.files;
                                        const filesArray = [...fileList];
                                        setProfileImage((prev) => [
                                          ...filesArray,
                                        ]);
                                        setFieldValue("image", filesArray);
                                      }}
                                      onBlur={handleBlur}
                                      // isInvalid={touched.image && !!errors.image}
                                    />
                                    {/* <Form.Control.Feedback type="invalid">
                                      {errors.image}
                                    </Form.Control.Feedback> */}
                                  </InputGroup>
                                </Form.Label>
                                {touched.image && errors.image ? (
                                  <Form.Text className="text-danger">
                                    {errors.image}
                                  </Form.Text>
                                ) : null}
                              </Form.Group>

                              <Form.Group as={Col} lg={12} controlId="name">
                                <Form.Label className="my-2">Name</Form.Label>
                                <InputGroup hasValidation>
                                  <Form.Control
                                    type="text"
                                    placeholder="Please enter your name"
                                    aria-describedby="inputGroupName"
                                    name="name"
                                    onBlur={handleBlur}
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={touched.name && !!errors.name}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                  </Form.Control.Feedback>
                                </InputGroup>
                                {/* {touched.name && errors.name ? (
                                  <Form.Text className="text-danger">
                                    {errors.name}
                                  </Form.Text>
                                ) : null} */}
                              </Form.Group>

                              <Form.Group as={Col} lg={12} controlId="phone">
                                <Form.Label className="my-2">
                                  Phone Number
                                </Form.Label>
                                {/* <Form.Control
                                    type="tel"
                                    placeholder="Please enter your phone number"
                                    aria-describedby="inputGroupPhone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    isInvalid={!!errors.phone}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                  </Form.Control.Feedback> */}
                                <InputGroup
                                  hasValidation
                                  className="d-flex align-items-center justify-content-between"
                                  id={
                                    errors.phone && touched.phone
                                      ? "phoneError"
                                      : "phoneInput"
                                  }
                                >
                                  <PhoneInput
                                    autoComplete="on"
                                    id="phone"
                                    name="phone"
                                    placeholder="+1 555-123-4567"
                                    value={values.phone}
                                    onChange={(value) =>
                                      setFieldValue("phone", value)
                                    }
                                    className="p-2 rounded"
                                    onBlur={handleBlur}
                                    style={{ width: "80%" }}
                                  />
                                  {errors.phone && touched.phone ? (
                                    <AiOutlineExclamationCircle className=" fs-5 mx-2 text-end text-danger" />
                                  ) : null}
                                </InputGroup>
                                {errors.phone && touched.phone ? (
                                  <Form.Text className="text-danger">
                                    {errors.phone}
                                  </Form.Text>
                                ) : null}
                              </Form.Group>

                              <Form.Group as={Col} lg={12} controlId="address">
                                <Form.Label className="my-2">
                                  Address
                                </Form.Label>
                                <div className="d-flex align-items-center justify-content-between">
                                  <InputGroup
                                    hasValidation
                                    id={
                                      errors.address && touched.address
                                        ? "addressError"
                                        : null
                                    }
                                  >
                                    {/* <Form.Control
                                    type="text"
                                    placeholder="Please enter your address"
                                    aria-describedby="inputGroupAddress"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={
                                      touched.address && !!errors.address
                                    }
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                  </Form.Control.Feedback> */}
                                    <GooglePlacesAutocomplete
                                      apiKey={import.meta.env.VITE_API_KEY}
                                      selectProps={{
                                        values,
                                        onChange: (value) => {
                                          setFieldValue("address", value);
                                        },
                                        placeholder: "Select address",
                                        defaultInputValue:values?.address?.label,
                                        isClearable: true,
                                        styles: {
                                          input: (provided) => ({
                                            ...provided,
                                            // color: "blue",
                                          }),
                                          control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            // borderColor: state.isFocused ? 'grey' : 'red',
                                          }),
                                        },
                                      }}
                                      onBlur={handleBlur}
                                    />
                                  </InputGroup>
                                  {errors.address && touched.address ? (
                                    <AiOutlineExclamationCircle className=" fs-1 mx-2 text-end text-danger" />
                                  ) : null}
                                </div>
                                {touched.address && errors.address ? (
                                  <Form.Text className="text-danger">
                                    {errors.address}
                                  </Form.Text>
                                ) : null}
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
