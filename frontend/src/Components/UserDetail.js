import React, { Component } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';


class UserDetail extends Component{

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };


    render() {
        return( <Container>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formFirstName">
                                <Form.Label className="label">First Name</Form.Label>
                                <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.firstName}
                                name="firstName"
                                required
                                onChange={this.props.handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formLastName">
                                <Form.Label className="label">Last Name</Form.Label>
                                <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.lastName}
                                name="lastName"
                                required
                                onChange={this.props.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formEmail">
                            <Form.Label className="label">Email Address</Form.Label>
                            <Form.Control
                            type="email"
                            defaultValue={this.props.inputValues.email}
                            name="email"
                            required
                            onChange={this.props.handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={this.saveAndContinue}>Next</Button>
                    </Form>
                </Container>
        );
    }
}

export default UserDetail;