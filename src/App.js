import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom';

import HomePage from './HomePage/HomePage'
import Nav from './Nav/Nav'

class App extends Component {
  render() {
    return (
     <div>
      {/* Nav Bar */}
      <Nav />
      <div className='container'>

      {/* Insert pages into this router */}
      <Router>
       <Route path='/' component={HomePage} />
      </Router>
     </div>
     </div>
    );
  }
}

export default App;
