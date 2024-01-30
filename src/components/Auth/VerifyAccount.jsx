import { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
const VerifyAccount = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputsRef = useRef([]);

  // Function to handle changes in the OTP input fields
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

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
            <Col lg={6}>
              <Form>
                {/* <div className="d-flex justify-content-center align-items-center gap-2"> */}
                 <Row lg={6}>
                 {otp.map((ele, index) => {
                    return (
                      <Form.Group as={Col} controlId={`otpInput${index}`} key={index}>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="otpInput"
                            value={ele}
                            maxLength={1}
                            style={{ fontSize: "1.5rem" }}
                            className="shadow text-center"
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
                  <Button className="shadow w-50 p-2" variant="outline-primary">Verify</Button>
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
