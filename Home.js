import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <h1>Hello {this.props.name}</h1>
        <img src={this.props.image} />
      </div>
    );
  }
}
