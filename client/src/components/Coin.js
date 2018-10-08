import React from 'react'
import { Card, Grid, Header, Divider } from 'semantic-ui-react'
import axios from 'axios'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

class Coin extends React.Component {
  state = { 
    coin: {} 
  }

  componentDidMount() {
    // /coins/:id
    const { match: { params: { id } } } = this.props
    axios.get(`/api/coins/${id}`)
      .then( res => this.setState({ coin: res.data }) )
  }

  calcPrice = (price, change) => {
    let c = parseFloat(change)
    let p = parseFloat(price)

    if (c < 0)
      return p * (Math.abs(( c / 100)) + 1)
    else
      return p / (( c / 100 ) + 1)
  }

  formatData = () => {
    const { coin } = this.state
    const { quotes = {} } = coin
    const data = quotes.USD
    if (data) {
      return [
        { time: '7 days', price: this.calcPrice(data.price, data.percent_change_7d) },
        { time: '24 hours', price: this.calcPrice(data.price, data.percent_change_24h) },
        { time: '1 hour', price: this.calcPrice(data.price, data.percent_change_1h) },
        { time: 'Current', price: parseFloat(data.price) }
      ]
    } else {
      return []
    }
  }

  render() {
    const { coin } = this.state
    const { quotes = {} } = coin
    const price = quotes.USD ? quotes.USD.price : '' 
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <Card>
              <Card.Content header={coin.name} />
              <Card.Content description={`$${parseFloat(price).toFixed(2)}`} />
              <Card.Content extra>
                <p>Rank: {coin.rank}</p>
                <p>Symbol: {coin.symbol}</p>
                <p>Supply: {coin.total_supply}</p>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h1">{coin.name} Historical Data</Header>
            <AreaChart height={400} width={800} data={this.formatData()}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8884D8"
                fill="#8884D8"
              />
            </AreaChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Coin

