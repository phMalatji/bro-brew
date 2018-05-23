import React, { Component } from 'react'

import './App.css'
// import BeerCategories from './lib/BeerCategories';
import Beers from './lib/Beers'
import { Link } from 'react-router-dom'
import axios from 'axios'

class App extends Component {
  state = {
    beers: [{
      name:"Filling up...",
      url:"http://www.google.com"
    }],
    beersBySearch: [],
    categories: [],
    searchTerm: '',
    isSearching: 'block',
    searchResultMessage:''
  }

  componentDidMount () {
    axios.get(`http://apichallenge.canpango.com/categories/`).then(res => {
      const beers = res.data
      this.setState({
        beers
      })
    })

    this.setCats()
  }

  setCats = () => {
    axios.get(`http://apichallenge.canpango.com/categories`).then(res => {
      const categories = res.data

      this.setState({ categories })
    })
  }

  searchBeer = event => {
    if (event.target.value.length > 0) {
      this.setState({
        searchTerm: event.target.value,
        isSearching: 'hideNow'
      })
      this.setState({ searchResultMessage: '' })
      this.populateSearch()
    } else {
      this.setState({
        searchTerm: '',
        isSearching: 'showNow'
      })
    }
  }

  populateSearch = () => {
    // search for beers
    axios
      .get(`http://apichallenge.canpango.com/beers/search/`, {
        params: {
          q: this.state.searchTerm
        }
      })
      .then(res => {
        const beersFromSearch = res.data

        this.setState({ beersBySearch: beersFromSearch })
      })


  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (typeof this.state.beersBySearch !== 'undefined' && this.state.beersBySearch.length > 0) {
      this.setState({ searchResultMessage: '' })
    }
    else{
      this.setState({ searchResultMessage: 'No results found :(' })
    }
 
    
  }

  showSearchBeers = () => {
    let isUserSearching = this.state.isSearching === 'hideNow'
      ? 'showNow'
      : 'hideNow'
    return isUserSearching
  }

  parseUrlToNumber = url => {
    let parts = url.split('/')
    let lastSegment = parts.pop() || parts.pop()
    return lastSegment
  }

  render () {
    return (
      <div className='App'>

        <div className='logoDiv'>

          <div>
            
            <img
              src={require('./assets/cheers-sketch.png')}
              className='logoStuff'
              alt='Logo'
            />
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type='text'
                name='q'
                className='inputBox'
                value={this.state.searchTerm}
                onChange={this.searchBeer}
              />
              <input type='submit' className='searchBtn' value='GET' />

            </form>
             {
               this.state.searchResultMessage
               }
                        </div>
               
        </div>
        <div id='beerscont' className={this.state.isSearching}>
          <Beers beers={this.state.beers} />
        </div>

        <div id='searchBeersDiv' className={this.showSearchBeers()}>
         {
           this.state.beersBySearch.map(beer => 
            <Link
            key={beer.name}
            to={`/beerdeets/${this.parseUrlToNumber(beer.url)}`}
          >
            <div key={beer.name}
            className='beerHover'
            > 
              <h2>{beer.name}</h2>
              </div>
              </Link>
          )
         }
        </div>
      </div>
    )
  }
}

export default App
