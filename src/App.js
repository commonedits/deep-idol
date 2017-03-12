import React, {Component} from 'react';
import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom';

import HomePage from './HomePage/HomePage'
import SubmitContentPage from './SubmitContentPage/SubmitContentPage'
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
                        <Route path='/submit' component={SubmitContentPage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
