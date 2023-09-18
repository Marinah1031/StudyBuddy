import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import styles from "./Contact.module.scss"; // Import styles using CSS modules

function Contact() {
  // State to manage form input values
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to track whether the email has been sent
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  // State to track whether the form is incomplete
  const [isFormIncomplete, setIsFormIncomplete] = useState(true);

  useEffect(() => {
    // Check if any of the form fields are empty
    const { name, email, message } = formValues;
    setIsFormIncomplete(!name || !email || !message);
  }, [formValues]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Initialize email.js with your public key
    const publicKey = "dODbK528Zdw0AO8BZ";
    emailjs.init(publicKey);

    // Specify the service and template IDs for sending the email
    const serviceID = "service_8u6ry8w";
    const templateID = "template_ayv6gyi";

    // Send the form data using email.js
    emailjs
      .sendForm(serviceID, templateID, e.target)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setIsEmailSent(true);
        
        // Clear the form fields after successful submission
        setFormValues({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  // Handle input changes and update formValues state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <section className={styles["contact-section"]}>
      <Container>
        <div className={styles["contact-card"]}>
          <h1>Contact Me</h1>
          {isEmailSent ? (
            <p className={styles["email-sent-message"]}>Your Email has been sent! 😊</p>
          ) : (
            <p>Have any questions or inquiries? Feel free to get in touch with us.</p>
          )}
          <Form className={styles["contact-form"]} onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                className={styles["contact-input"]}
                placeholder="Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                className={styles["contact-input"]}
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Control
                as="textarea"
                className={styles["contact-input"]}
                rows={4}
                placeholder="Message"
                name="message"
                value={formValues.message}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button
              className={styles["submitBtn"]}
              variant="primary"
              type="submit"
              disabled={isFormIncomplete}
            >
              {isEmailSent ? "Sent!" : "Submit"}
            </Button>
          </Form>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
