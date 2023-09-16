import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import "./Home.scss"; // Import the SCSS file
import Start from "../Start/Start";
import Type from "../Type/Type";
import "./Home.css"

function Home() {
    return (
        <section>
            <Navbar />
            <Container className="type-container-writer">
                <Col md={12} className="text-center type-margin">
                    <div className="title-Study">Study For: </div>
                    <Type />
                </Col>
            </Container>
            <Container fluid className="home-section" id="home">
                <Container className="home-content text-center">
                    <Row>
                        <Col md={12}>
                            <Start />
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    );
}


export default Home;