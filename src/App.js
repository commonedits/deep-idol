import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom';

import HomePage from './HomePage/HomePage'

class App extends Component {
  render() {
    return (
     <div>
      <Nav />
      <Router>
       <Route path='/' component={HomePage} />
      </Router>
     </div>
    );
  }
}

export default App;
