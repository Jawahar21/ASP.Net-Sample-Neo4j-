import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import EmployeeForm from './components/AddEmployeeForm';
import AllEmployees from './components/AllEmployees';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/registerEmployee' component={EmployeeForm} />
        <Route path='/getAllEmployees' component={AllEmployees} />
      </Layout>
    );
  }
}
