import { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { VerifyUser } from "../../features/featureActions/Actions";
import { useDispatch } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
const VerifyAccount = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputsRef = useRef([]);
  const location=useLocation();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const userId=location?.state?.userId ? location?.state?.userId : null
  // Function to handle changes in the OTP input fields
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };
  const onSubmit=async(e)=>{
    e.preventDefault();
    const userOtp=otp.join("");
    console.log("otp",userOtp)
    try{
      let payload = {
        body: {
          otp:userOtp,
          userId
        },
        params: false,
        isToast: true,
      };
      const user=await dispatch(VerifyUser(payload)).unwrap();
      if(user?.data?.data?.isProfileCompleted){
        navigate("/home");
      }else{
        navigate("/completeProfile")
      }
    }catch(rejectedValueOrSerializedError){

    }
  }
  // Function to focus on the next OTP input field
  // we've added a check to ensure that otpInputsRef.current is not null or undefined
  const focusNextInput = (index) => {
    if (otpInputsRef.current && index < otpInputsRef.current.length - 1) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (index > 0 ) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // If backspace is pressed and the current input field is empty,
    // focus on the previous input field
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      // Prevent the default behavior of the input field
      e.preventDefault();
      // If backspace is pressed and the current input field is empty,
      // remove the content in the previous input field and focus on it
      const newIndex = index - 1;
      const newOtp = [...otp];
      newOtp[newIndex] = "";
      setOtp(newOtp);
      focusPreviousInput(index);
    }
  };
  return (
    <>
      <section className="otp-section">
        <Container>
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <Col lg={6}>
              <Card className="shadow my-5 text-center p-3">
                <Card.Title
                  className="display-6"
                  style={{ fontFamily: "Work sans" }}
                >
                  Verify Account
                </Card.Title>
              </Card>
            </Col>
            <Col lg={4}>
              <Form onSubmit={onSubmit}>
                {/* <div className="d-flex justify-content-center align-items-center gap-2"> */}
                 <Row lg={6} className="mx-1">
                 {otp.map((ele, index) => {
                    return (
                      <Form.Group as={Col} className="p-1" controlId={`otpInput${index}`} key={index}>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="otpInput"
                            value={ele}
                            maxLength={1}
                            style={{ fontSize: "1.5rem" }}
                            className="shadow text-center "
                            onChange={(e) => {
                              handleOtpChange(index, e.target.value);
                              focusNextInput(index);
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(input) => {
                              otpInputsRef.current[index] = input;
                            }}
                          />
                        </InputGroup>
                      </Form.Group>
                    );
                  })}
                 </Row>
                {/* </div> */}
                <Row>
                  <Col className="d-flex justify-content-center align-items-center py-5">
                  <Button type="submit" className="shadow w-50 p-2" variant="outline-primary">Verify</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default VerifyAccount;
