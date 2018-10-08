import React from 'react'
import { connect } from 'react-redux'
import { 
  Table,
  Divider,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getCoins } from '../reducers/coins'

class CoinList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCoins())
  }

  headers = () => {
    return ['Symbol', 'Name', 'Price'].map( header =>
      <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
    )
  }

  render() {
    const { coins } = this.props
    return (
      <>
        <Divider />
        <Table celled striped>
          <Table.Header>
            { this.headers() }
          </Table.Header>
          <Table.Body>
            { coins.map( coin => {
                const { name, price, symbol, cmc_id, id } = coin
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <Link to={`/coins/${cmc_id}`}>
                        { symbol }
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      { name }
                    </Table.Cell>
                    <Table.Cell>
                      ${ parseFloat(price).toFixed(2) }
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>

        </Table>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { coins: state.coins }
}


export default connect(mapStateToProps)(CoinList)

