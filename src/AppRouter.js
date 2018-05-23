import React from 'react'
import { BrowserRouter as Router, Route ,Link} from 'react-router-dom'

import App from './App'
import ABeer from './lib/ABeer'
import BeerDeets from './lib/BeerDeets'

class AppRouter extends React.Component {


  render() {

    return( 
  <Router>
    <div>
      <header className='App-header'>
        <Link to="/">
        <h1 className='App-title'>Bro's Breweries</h1>
        </Link>
      </header>

      <Route exact path='/' component={App} />
      <Route 
        path='/beer/:id'
        render={props => <ABeer catId={props.match.params.id} {...props} />}
      />
        <Route 
        path='/beerdeets/:id'
        render={props => <BeerDeets beerId={props.match.params.id} {...props} />}
      />
    </div>
  </Router>
);
  }
}

export default AppRouter
