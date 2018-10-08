import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import axios from 'axios'

class Home extends Component {
  render() {
    return (
      <Header as='h1' textAlign='center'>Home Component</Header>
    );
  }
}

export default Home;
