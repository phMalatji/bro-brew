import React from 'react'
import axios from 'axios'
import './../App.css'
import { Link } from 'react-router-dom'

class BeerDeets extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      beer: {}
    }
  }

  componentDidMount () {
    axios
      .get(`http://apichallenge.canpango.com/beers/${this.props.beerId}`)
      .then(res => {
        const beer = res.data

        this.setState({ beer: beer })
      })
  }

  getCategoryName = num => {
    axios.get(`http://apichallenge.canpango.com/category/${num}`).then(res => {
      const category = res.data.name

      this.setState({ category })
    })
  }

  parseUrlToNumber = url => {
    let parts = url.split('/')
    let lastSegment = parts.pop() || parts.pop()
    return lastSegment
  }
  render () {
    return (
      <div className='App'>

        <div className='btn'>
          <span>
            {this.state.beer.name}

          </span>
        </div>

        <div className='beerDiv'>
          ibu: {this.state.beer.ibu}, <br />
          calories: {this.state.beer.calories}, <br />
          abv: {this.state.beer.abv}, <br />
          style: {this.state.beer.style}, <br />
          Brewery location: {this.state.beer.brewery_location}, <br />

        </div>

        <Link to='/'>
          <div className='btnLike'>
            Back to Brews

          </div>
        </Link>
      </div>
    )
  }
}

export default BeerDeets
