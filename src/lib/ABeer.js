import React from 'react'
import axios from 'axios'
import './../App.css'
import { Link } from 'react-router-dom'

class ABeer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      beers: [],
      category: '',
      categories: ''
    }

    this.getCategoryName(props.catId)
  }

  componentDidMount () {
    axios.get(`http://apichallenge.canpango.com/beers/`).then(res => {
      const beers = res.data
      let pickByCatBeers = []

      beers.forEach(beer => {
        const urlString = `http://apichallenge.canpango.com/category/${this.props.catId}/`
        if (beer.category === urlString) {
          pickByCatBeers.push(beer)
        }
      })
      this.setState({ beers: pickByCatBeers })
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
            {this.state.category}
            's
          </span>
        </div>

        {this.state.beers.map(beer => (
          <Link
            key={beer.name}
            to={`/beerdeets/${this.parseUrlToNumber(beer.url)}`}
          >
            <div key={beer.name} className='beerHover'>
              <h1>
                {beer.name}
              </h1>

            </div>
          </Link>
        ))}

        <Link to='/'>
          <div className='btnLike'>
            Back to Brews

          </div>
        </Link>
      </div>
    )
  }
}

export default ABeer
