import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock,Button } from 'react-bootstrap';
import './react-bootstrap-table.min.css';
import './react-bootstrap-table-all.min.css';
import NotificationAlert from 'react-notification-alert';

export default class EmployeeForm extends Component {
    constructor() {
        super();
        this.state = { id: '', name: '', email: '', phno: '', desig: '' };
    }
    handleIdChange(event) {
        this.setState({
            id: event.target.value,
        })
    }
    handleNameChange(event) {
        this.setState({
            name: event.target.value,
        })
    }
    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        })
    }
    handlePhnoChange(event) {
        this.setState({
            phno: event.target.value,
        })
    }
    handleDesigChange(event) {
        this.setState({
            desig: event.target.value,
        })
    }
    submitForm(event) {
        console.log("Heere");
        event.preventDefault();
        fetch('odata/Employee', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                phno: this.state.phno,
                desig: this.state.desig
            })
        })
        .then( (response) => response.json())
            .then((responseJson) => {
                this.setState({
                    id: '',
                    name: '',
                    email: '',
                    phno: '',
                    desig: ''
                });
                console.log(responseJson)
                this.refs.notificationAlert.notificationAlert({
                    place: 'tr',
                    message: (
                        <div>
                            <div>
                                <p>{responseJson.value}</p>
                            </div>
                        </div>
                    ),
                    type: 'success',
                    autoDismiss: 2,
                    closeButton: false
                });
                console.log(responseJson);
            })
    }
    render() {
        return (
            <div>
                <div>
                    <h2>Add Employee</h2>
                </div>
                <div>
                    <NotificationAlert ref="notificationAlert" />
                    <form onSubmit={(event) => this.submitForm(event)} >
                        <FormGroup
                            controlId="empId"
                        //validationState={this.getValidationState()}
                        >
                            <ControlLabel>Employee ID</ControlLabel>
                            <FormControl
                                bsSize="sm"
                                type="number"
                                value={this.state.id}
                                placeholder="Ex:3012"
                                onChange={(event) => this.handleIdChange(event)}
                            />
                            <FormControl.Feedback />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                        <FormGroup
                            controlId="empName"
                        //validationState={this.getValidationState()}
                        >
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                bsSize="sm"
                                type="text"
                                value={this.state.name}
                                placeholder="Ex: John Smith"
                                onChange={(event) => this.handleNameChange(event)}
                            />
                            <FormControl.Feedback />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                        <FormGroup
                            controlId="empEmail"
                        //validationState={this.getValidationState()}
                        >
                            <ControlLabel>Email ID</ControlLabel>
                            <FormControl
                                bsSize="sm"
                                type="text"
                                value={this.state.email}
                                placeholder="Ex: john.smith@example.com"
                                onChange={(event) => this.handleEmailChange(event)}
                            />
                            <FormControl.Feedback />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                        <FormGroup
                            controlId="empPhno"
                        //validationState={this.getValidationState()}
                        >
                            <ControlLabel>Phone No.</ControlLabel>
                            <FormControl
                                bsSize="sm"
                                type="number"
                                value={this.state.phno}
                                placeholder="Ex: 9849934832"
                                onChange={(event) => this.handlePhnoChange(event)} 
                            />
                            <FormControl.Feedback />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                        <FormGroup
                            controlId="empDesig"
                        //validationState={this.getValidationState()}
                        >
                            <ControlLabel>Designation</ControlLabel>
                            <FormControl
                                bsSize="sm"
                                type="text"
                                value={this.state.desig}
                                placeholder="Ex: Software Analyst"
                                onChange={(event) => this.handleDesigChange(event)}
                            />
                            <FormControl.Feedback />
                            <HelpBlock></HelpBlock>
                        </FormGroup>
                        <Button type="submit" bsStyle="primary">Submit</Button>
                    </form>
                </div>
            </div>
            );
    }
}