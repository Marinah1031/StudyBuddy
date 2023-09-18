import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import styles from "./Contact.module.scss"; // Import styles using CSS modules

function Contact() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isFormIncomplete, setIsFormIncomplete] = useState(true);

  useEffect(() => {
    const { name, email, message } = formValues;
    setIsFormIncomplete(!name || !email || !message);
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const publicKey = "dODbK528Zdw0AO8BZ";
    emailjs.init(publicKey);

    const serviceID = "service_8u6ry8w";
    const templateID = "template_ayv6gyi";

    emailjs
      .sendForm(serviceID, templateID, e.target)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setIsEmailSent(true);
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
