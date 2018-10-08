import React from 'react';
import CoinForm from './CoinForm'
import CoinList from './CoinList'

class Home extends React.Component {
  state = { key: 0 }

  resetForm = () => {
    this.setState( state => ({ key: state.key + 1 }) )
  }

  render() {
    return (
      <>
        <CoinForm key={this.state.key} resetForm={this.resetForm} />
        <CoinList />
      </>
    )
  }
}

export default Home;
