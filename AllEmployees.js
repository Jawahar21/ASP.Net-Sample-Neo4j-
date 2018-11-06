import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NotificationAlert from 'react-notification-alert';
export default class AllEmployees extends Component {
    constructor() {
        super()
        this.state = {
            employees: '',
            isLoading: true,
        }
        this.handleDeletedRow = this.handleDeletedRow.bind(this);
    }
    componentDidMount() {
        fetch('odata/Employee', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then( (response) => response.json())
            .then((responseJson) => {
                this.setState({
                    employees: responseJson.value,
                    isLoading: false
                })
                console.log(responseJson);
            })
    }
    /*handleInsertedRow(row) {
        console.log(row);
        fetch('api/Employee', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: row.id,
                name: row.name,
                email: row.email,
                phno: row.phno,
                desig: row.desig
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                alert("Succesfully Added " + responseJson + " Data");
                console.log(responseJson);
            })
    }*/
    handleDeletedRow(row) {
        console.log(row);
        fetch('odata/Employee('+row[0]+')', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: row,
            }) 
        })
            .then((response) => {
                console.log(response)
                response.json()
            } )
            .then((responseJson) => {
                this.refs.notificationAlert.notificationAlert({
                    place: 'tr',
                    message: (
                        <div>
                            <div>
                                <p>{responseJson}</p>
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
    afterSaveCell(row, cellName, cellValue) {
        // do your stuff...
        console.log(row);
        console.log(row.id);
       fetch('odata/Employee('+row.id+')', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
    }
    render() {
        const options = {
            //afterInsertRow: this.handleInsertedRow,
            afterDeleteRow: this.handleDeletedRow
        };
        const selectRow = {
            mode: 'checkbox' 
        }
        const cellEdit = {
            mode: 'dbclick',
            blurToSave: false,
            afterSaveCell: this.afterSaveCell
        }
        return (
            <div>
                <NotificationAlert ref="notificationAlert" />
                {
                    (this.state.isLoading) ?
                        <div>
                            <p>Please wait loading...</p>
                        </div>
                        :
                        <div>
                            
                            <BootstrapTable data={this.state.employees} keyField='id' striped={true} hover={true} options={options} selectRow={selectRow} cellEdit={cellEdit} deleteRow>
                                <TableHeaderColumn dataField='id'>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                                <TableHeaderColumn dataField='phno'>Phone No.</TableHeaderColumn>
                                <TableHeaderColumn dataField='desig'>Designation</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                }
            </div>
            );
    }
}
/*{
    (this.state.employees == '') ?
        <div>
            <h1>No Employees</h1>
        </div>
        :
        <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Designation</th>
                    <th>Edit/Delete</th>
                </tr>
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
                                <td>
                                    <Button
                                        bsStyle="link"
                                        value={JSON.stringify({ id: record.id, name: record.name, email: record.email, phno: record.phno, desig: record.desig })}
                                        onClick={(event) => this.handleEdit(event)}
                                    >
                                        Edit/Delete
                                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
}*/