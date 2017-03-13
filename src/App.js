import React, {Component} from 'react';
import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom';

import HomePage from './HomePage/HomePage'
import SubmitContentPage from './SubmitContentPage/SubmitContentPage'
import UploadChoosePage from './UploadChoosePage/UploadChoosePage'
import FlowNotesChoosePage from './FlowNotesChoosePage/FlowNotesChoosePage'
import ThankYouPage from './ThankYouPage/ThankYouPage'
import FlowNotes from './FlowNotes/FlowNotes.js'
import Nav from './components/Nav/Nav'

class App extends Component {

 constructor(props) {
   super(props);
   this.state = {
    displayNav: true,
   }
 }

 hideNav(){
  this.setState({displayNav: false})
 }

    render() {
        return (
            <Router>
                <div>
                    {/* Nav Bar */}
                    {this.state.displayNav && <Nav ref="navbar" hideNav={this.hideNav}/>}
                    <div className='container'>

                        {/* Insert pages into this router */}
                        <Route exact path='/' component={HomePage}/>
                        <Route path='/submit' component={SubmitContentPage}/>
                        <Route path='/upload/:content' component={UploadChoosePage}/>
                        <Route exact path='/flownotes' component={FlowNotesChoosePage}/>
                        <Route path='/flownotes/create' component={FlowNotes}/>
                        <Route path='/thanks' component={ThankYouPage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
