import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
export default class AllEmployees extends Component {
    constructor() {
        super()
        this.state = {
            employees: '',
            isLoading: true
        }
    }
    componentDidMount() {
        fetch('api/Employee', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then( (response) => response.json())
            .then((responseJson) => {
                this.setState({
                    employees: responseJson,
                    isLoading: true
                })
                console.log(responseJson);
            })
    }
    render() {
        return (
            <div>
                {
                    (this.state.employees == '' ) ?
                        <p>No Employees</p>
                        :
                        <Table striped bordered condensed hover>
                            <thead>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                <th>Designation</th>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map((record) => {
                                        return (
                                            <tr>
                                                <td>{record.id}</td>
                                                <td>{record.name}</td>
                                                <td>{record.email}</td>
                                                <td>{record.phno}</td>
                                                <td>{record.desig}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                }
            </div>
            );
    }
}