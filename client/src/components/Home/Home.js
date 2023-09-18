import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import "./Home.scss"; // Import the SCSS file
import Start from "../Start/Start";
import Type from "../Type/Type";
import "./Home.css"; // Import additional CSS file

function Home() {
    return (
        <section>
            {/* Container for the typing animation section */}
            <Container className="type-container-writer">
                {/* Column for centering content */}
                <Col md={12} className="text-center type-margin">
                    {/* Title for the study section */}
                    <div className="title-Study">Study For: </div>
                    {/* Component for typing animation */}
                    <Type />
                </Col>
            </Container>

            {/* Container for the main content section */}
            <Container fluid className="home-section" id="home">
                {/* Container for centering content */}
                <Container className="home-content text-center">
                    <Row>
                        <Col md={12}>
                            {/* Component for the start section */}
                            <Start />
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    );
}

export default Home;
