import React from 'react';
import './../App.css';
import {

  Link
} from 'react-router-dom'

class Beer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classBrew:'beer'
    }

   
  }
  hoverBeer = () => {
    let newState = this.state.classBrew === 'beer' ? 'beerHover' : 'beer'
    this.setState({
      classBrew:newState
    })
  }

  linkToRoute = () => {

  }
  render() {

    return( 

      <Link to={`/beer/${this.props.category}`} categories={this.props.categories}>
      <div className={this.state.classBrew}
        onMouseEnter={this.hoverBeer}
        onMouseLeave={this.hoverBeer}
      
      >
       <h1> { this.props.name} </h1>
      </div>
      </Link>
        );

  }
}



export default Beer;