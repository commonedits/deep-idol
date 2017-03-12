import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom';

import HomePage from './HomePage/HomePage'
import PickUploadPage from './PickUploadPage/PickUploadPage'
import Nav from './components/Nav/Nav'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    {/* Nav Bar */}
                    <Nav/>
                    <div className='container'>

                        {/* Insert pages into this router */}
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/upload' component={PickUploadPage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
