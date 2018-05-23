import React from 'react'
import Beer from './Beer'
import './../App.css'

class Beers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classBrew: 'beer',
      beers: this.props.beers,
      categories: this.props.categories
    }
  }

  hoverBeer = () => {
    let newState = this.state.classBrew === 'beer' ? 'beerHover' : 'beer'
    this.setState({
      classBrew: newState
    })
  }
  parseUrlToNumber = url => {
    let parts = url.split('/')
    let lastSegment = parts.pop() || parts.pop()
    return lastSegment
  }
  render () {
    return (
      <div>
        {this.props.beers.map(beer => (
          <Beer
            key={beer.name}
            name={beer.name}
            categories={this.props.categories}
            category={this.parseUrlToNumber(beer.url)}
          />
        ))}

      </div>
    )
  }
}

export default Beers
